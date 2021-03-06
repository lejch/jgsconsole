/*
 * 表单验证插件 easyform
 * http://thesmallcar.github.io/jQuery.easyform/
 * Author : 李兰非
 * 有问题欢迎加入QQ群，222578556（Hello PHP），我是群主：大树。
 * 2014-11-5
 * 用于表单验证
 * 只要在需要验证的控件上添加easyform属性即可，多个属性用[;]连接，语法类似css
 * 属性列表：
 *      null
 *      email
 *      char-normal         英文、数字、下划线
 *      char-chinese        中文、英文、数字、下划线、中文标点符号
 *      char-english        英文、数字、下划线、英文标点符号
 *      length:1 10 / length:4      能够识别汉字等宽字符长度
 *      equal:xxx                               等于某个对象的值，冒号后是jq选择器语法
 *      ajax:fun()
 *      real-time                               实时检查
 *      date                    2014-10-31
 *      time                    10:30:00
 *      datetime            2014-10-31 10:30:00
 *      money               正数，两位小数
 *      uint :1 100                 正整数 , 参数为起始值和最大值
 *      number              不限长度的数字字符串
 *      float:7 2
 *      regex:"^(\\d{4})-(\\d{2})-(\\d{2})$"
 *      mobile              手机
 * */

/*
 * 更新日志
 * Author: 郑大柱(galandeo)
 * 2015/12/6
 *
 * --修复 BUG
 *    该BUG导致因元素未设置ID值而引发不能弹出提示的BUG
 * --增加 mobile验证
 *    增加mobile规则验证
 *
 * */
;

/**
 * 读取一个控件的指定data属性，并通过：和；来分割成key/value值对
 * @id string 控件id
 * @name string 属性名称
 **/
if (typeof(easy_load_options) == "undefined") {
    // function easy_load_options(id, name) // # by galandeo, fix bug
    function easy_load_options(obj, name)
    {
        var options = $(obj).data(name);
        // var options = $("#" + id).data(name);

        //将字符串用；分割
        options = (!!options ? options.split(";") : undefined);

        var data = Object();

        if (!!options) {
            var index;
            for (index in options) {
                var temps = options[index];
                var p = temps.indexOf(":");

                var temp = [];
                if (-1 == p) {
                    temp[0] = temps;
                    temp[1] = "";
                }
                else {
                    temp[0] = temps.substring(0, p);
                    temp[1] = temps.substring(p + 1);
                }

                if (temp[0].length > 0) {
                    data[temp[0]] = temp[1];
                }
            }
        }

        return data;
    }
}

//easyform
(function ($, window, document, undefined)
{
    /*
     构造函数
     **/
    var _easyform = function (ele, opt)
    {
        this.form = ele;

        this.id = Math.random();

        if (0 == this.form.length && "form" != this.form[0].localName) {
            throw new Error("easyform need a form !");
        }

        this.defaults = {
            easytip: true,   //是否显示easytip，可以关闭后，使用自定义的提示信息
            success: null,
            error: null,
            complete: null,
            per_validation: null
        };

        this.options = $.extend({}, this.defaults, opt);


        this.is_submit = true;  //是否提交，如果为false，即使验证成功也不会执行提交

        //事件定义
        this.success = this.options.success;
        this.error = this.options.error;
        this.complete = this.options.complete;
        this.per_validation = this.options.per_validation;     //在所有验证之前执行

        this._check_back = null;
    };

    //方法
    _easyform.prototype = {

        init: function ()
        {
            this.inputs = [];
            this.counter_success = [];   //已经判断成功的input计数
            this.counter = [];                   //已经判断的input计数

            var $this = this;
            $this._load();

            //改写 submit 的属性，便于控制
            this.submit_button = this.form.find("input:submit");
            this.submit_button.each(function ()
                {
                    var button = $(this);
                    button.attr("type", "button");

                    //提交前判断
                    button.click(function ()
                        {
                            $this.submit(true);
                        }
                    );
                }
            );

            return this;
        },

        _load: function (iterator)
        {
            if (!iterator) {
                iterator = "input:visible, textarea:visible";
            }

            for (var i in this.inputs) {
                this.inputs[i].destructor();
            }

            //析构旧的easyinput，防止real-time条件下的重复验证。
            this._array_empty(this.inputs);

            var $this = this;

            this.form.find(iterator).each(function (index, input)
                {
                    //排除 hidden、button、submit、file
                    if (input.type != "hidden" && input.type != "button" && input.type != "submit"
                        && input.type != "file") {
                        if (input.type == "radio" || input.type == "checkbox") {
                            var name = input.name;

                            for (index in  $this.inputs) {
                                if (name == $this.inputs[index].input[0].name) {
                                    return;
                                }
                            }
                        }

                        var checker = $(input).easyinput({easytip: $this.options.easytip});

                        checker.error = function (e, r)
                        {
                            $this.is_submit = false;
                            //$this.result.push(e);

                            if (!!$this.error)    //失败事件
                            {
                                $this.error($this, e, r);
                            }
                        };

                        checker.complete = function (e)
                        {
                            //记录已经完成检查的input
                            $this._array_add_unique($this.counter, (!!e.id ? e.id : e.name));

                            if ($this.counter.length == $this.inputs.length) {
                                //$this._array_empty($this.counter_success);
                                //$this._array_empty($this.counter);

                                if (!!$this.complete)    //结束事件
                                {
                                    $this.complete($this);
                                }

                                if (!!$this._check_back) {
                                    $this._check_back($this._is_success());
                                    $this._check_back = null;
                                }
                            }
                        };

                        checker.success = function (e)
                        {
                            //记录检查成功的控件
                            $this._array_add_unique($this.counter_success, (!!e.id ? e.id : e.name));

                            if ($this._is_success()) {
                                //$this._array_empty($this.counter_success);
                                //$this._array_empty($this.counter);

                                if (!!$this.success)    //成功事件
                                {
                                    $this.success($this);
                                }

                                if (!!$this.is_submit) {
                                    $this.form.submit();
                                }
                            }
                        };

                        $this.inputs.push(checker);
                    }
                }
            );
        },

        _is_success: function ()
        {
            return this.inputs.length == this.counter_success.length;
        },

        _array_empty: function (arr)
        {
            arr.splice(0, arr.length);
        },

        _array_add_unique: function (arr, value)
        {
            if (-1 == arr.indexOf(value)) {
                arr.push(value);
            }
        },

        _check: function (submit)
        {
            this._array_empty(this.counter_success);
            this._array_empty(this.counter);

            this.is_submit = submit;

            //执行per_validation事件
            if (!!this.per_validation) {
                this.is_submit = this.per_validation(this);
            }

            //如果没有需要判断的控件
            if (this.inputs.length == 0) {
                if (!!this.success)    //成功事件
                {
                    this.success(this);
                }

                if (!!this.complete)    //结束事件
                {
                    this.complete(this);
                }

                if (this.is_submit) {
                    this.form.submit();
                }
            }

            var index;
            for (index in this.inputs) {
                this.inputs[index].validation(false);
            }
        },

        /*
         * 表单提交函数
         * @submit：bool值，用于定义是否真的提交表单
         * */
        submit: function (submit)
        {
            this._load();           //重新载入控件

            this._check(submit);        //验证并提交
        },

        check: function (iterator, fun)
        {
            this._check_back = fun;

            this._load(iterator);       //重新载入控件

            this._check(false);        //验证不提交
        },

        show: function (iterator, msg)
        {
            if (!iterator) {
                iterator = "input:visible, textarea:visible";
            }

            this.form.find(iterator).each(function (index, input)
                {
                    if (input.type != "hidden" && input.type != "button" && input.type != "submit"
                        && input.type != "file") {
                        $(this).easytip().show(msg);
                    }
                }
            );
        }
    };

    //添加到jquery
    $.fn.easyform = function (options)
    {
        var validation = new _easyform(this, options);

        return validation.init();
    };

})(jQuery, window, document);

//easyinput
(function ($, window, document, undefined)
{
    //单个input的检查器构造函数
    var _easyinput = function (input, opt)
    {
        if (0 == input.length) {
            throw new Error("easyform need a input object !");
        }

        this.input = input;     //绑定的控件
        this.rules = [];            //规则

        //事件
        this.error = null;
        this.success = null;
        this.complete = null;

        this.defaults = {
            "easytip": true,   //是否显示easytip
            "real-time": false
        };

        this.tip = null;    //关联的tip

        //读取 data-easyform属性
        // this.rules = easy_load_options(input[0].id, "easyform"); // # by galandeo, fix bug
        this.rules = easy_load_options(input[0], "easyform");

        //处理data-easyform中的配置属性
        var o = Object();
        for (var index in this.rules) {
            if (index == "easytip") {
                o["easytip"] = this.rules[index];
            }
            else if (index == "real-time") {
                o["real-time"] = true;
            }
        }

        delete this.rules["easytip"];
        delete this.rules["real-time"];

        this.options = $.extend({}, this.defaults, opt, o);

        this.counter_success = 0;   //计数器，记录已经有多少个条件成功
        this.counter = 0;                   //计数器，记录已经验证了多少条件

        this.is_error = false;      //错误标志
    };

    //单个input的检查器
    _easyinput.prototype = {

        init: function ()
        {
            //初始化easytip
            if (true === this.options.easytip) {
                this.tip = $(this.input).easytip();
            }

            var $this = this;

            //是否实时检查
            if (!!this.rules && this.options["real-time"]) {
                this.input.on("blur", function ()
                    {
                        $this.validation(true);
                    }
                );
            }

            return this;
        },

        /**
         * 规则判断
         * */
        validation: function (real_time)
        {
            this.value = this.input.val();
            this.counter_success = 0;   //计数器清零
            this.counter = 0;
            this.is_error = false;

            if (this.input.attr("type") == "radio" || this.input.attr("type") == "checkbox") {
                var name = this.input.attr("name");

                var v = $('input[name="' + name + '"]:checked').val();

                if (false == this._null(this, v, this.rules, {"realtime": real_time})) {
                    if (false == this.is_error) {
                        this._success({"realtime": real_time});
                    }
                }
            }
            else if (false == this._null(this, this.value, this.rules, {"realtime": real_time})) {
                delete this.rules.null;

                for (var index in this.rules) {
                    if (index == undefined) {
                        continue;
                    }
                    //调用条件函数
                    if (!!this.judge[index]) {
                        this.judge[index](this, this.value, this.rules[index], {"realtime": real_time});
                    }
                }
            }
        },

        show: function (msg)
        {
            this.tip.show(msg);
        },

        _error: function (rule, option)
        {
            this.counter++;

            if (!!this.error) {
                this.error(this.input[0], rule);
            }

            $(this.input).trigger("easyform-error", [this.input, rule]);

            if (!option.realtime && !!this.complete && this.counter == Object.keys(this.rules).length) {
                this.complete(this.input[0]);
            }

            if (false == this.is_error) {
                var msg = $(this.input).data("message-" + rule);

                if (!msg) {
                    msg = $(this.input).data("message");
                }

                msg = !msg ? "格式错误" : msg;

                if (true === this.options.easytip) {
                    this.tip.show(msg);
                }

                this.is_error = true;
            }

            return false;
        },

        _success: function (option)
        {
            if (!!this.success) {
                $(this.input).trigger("easyform-success", [this.input]);
                this.success(this.input[0]);
            }

            if (!option.realtime && !!this.complete) {
                this.complete(this.input[0]);
            }

            return true;
        },

        _success_rule: function (rule, option)
        {
            this.counter++;
            this.counter_success++;

            $(this.input).trigger("easyform-success-" + rule, [this.input]);

            if (!option.realtime && this.counter_success == Object.keys(this.rules).length) {
                this._success(option);
            }

            return true;
        },

        _null: function (ei, v, r, o)
        {
            if (!v) {
                //rule不为空并且含有null
                if (!!r && typeof(r["null"]) != "undefined") {
                    if (false == o.realtime) {
                        return ei._success(o);
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return ei._error("null", o);
                }
            }
            //当控件没有规则，或者只有一个null规则
            else if (Object.keys(r).length == 0 || (Object.keys(r).length == 1 && typeof(r["null"]) != "undefined")) {
                if (!o.realtime && !!this.complete) {
                    this.complete(this.input[0]);
                }

                if (!!v) {
                    return ei._success(o);
                }

                return false;
            }
            else {
                return false;
            }
        },

        /*
         * 按照各种rule进行判断的函数数组
         * 通过对judge添加成员函数，可以扩充规则
         * */
        judge: {
            "char-normal": function (ei, v, p, o)
            {
                if (false == /^\w+$/.test(v)) {
                    return ei._error("char-normal", o);
                }
                else {
                    return ei._success_rule("char-normal", o);
                }
            },

            "char-chinese": function (ei, v, p, o)
            {
                if (false == /^([\w]|[\u4e00-\u9fa5]|[ 。，、？￥“”‘’！：【】《》（）——.,?!$'":+-])+$/.test(v)) {
                    return ei._error("char-chinese", o);
                }
                else {
                    return ei._success_rule("char-chinese", o);
                }
            },

            "char-english": function (ei, v, p, o)
            {
                if (false == /^([\w]|[ .,?!$'":+-])+$/.test(v)) {
                    return ei._error("char-english", o);
                }
                else {
                    return ei._success_rule("char-english", o);
                }
            },

            "email": function (ei, v, p, o)
            {
                if (false == /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(v)) {
                    return ei._error("email", o);
                }
                else {
                    return ei._success_rule("email", o);
                }
            },

            "mobile": function (ei, v, p, o)
            {
                if (false == /^(0|86|17951)?(1)(3[0-9]|4[0-9]|5[0-9]|7[0-9]|8[0-9])[0-9]{8}$/.test(v)) {
                    return ei._error("mobile", o);
                }
                else {
                    return ei._success_rule("mobile", o);
                }
            },

            "length": function (ei, v, p, o)
            {
                var range = p.split(" ");

                //如果长度设置为 length:6 这样的格式
                if (range.length == 1) {
                    range[1] = range[0];
                }

                var len = v.replace(/[^\x00-\xff]/g, "aa").length;

                if (len < range[0] || len > range[1]) {
                    return ei._error("length", o);
                }
                else {
                    return ei._success_rule("length", o);
                }
            },

            "idcard": function (ei, v, p, o)
            {
                /*
                 * 身份证15位编码规则：dddddd yymmdd xx p
                 * dddddd：6位地区编码
                 * yymmdd: 出生年(两位年)月日，如：910215
                 * xx: 顺序编码，系统产生，无法确定
                 * p: 性别，奇数为男，偶数为女
                 *
                 * 身份证18位编码规则：dddddd yyyymmdd xxx y
                 * dddddd：6位地区编码
                 * yyyymmdd: 出生年(四位年)月日，如：19910215
                 * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
                 * y: 校验码，该位数值可通过前17位计算获得
                 *
                 * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
                 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
                 * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
                 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
                 * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
                 */

                //15位和18位身份证号码的正则表达式
                var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

                //如果通过该验证，说明身份证格式正确，但准确性还需计算
                if (reg.test(v)) {
                    if (v.length == 18) {
                        var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //将前17位加权因子保存在数组里
                        var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                        var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                        for (var i = 0; i < 17; i++) {
                            idCardWiSum += v.substring(i, i + 1) * idCardWi[i];
                        }

                        var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                        var idCardLast = v.substring(17);//得到最后一位身份证号码

                        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                        if (idCardMod == 2) {
                            if (idCardLast == "X" || idCardLast == "x") {
                                return ei._success_rule("idcard", o);
                            }
                            else {
                                return ei._error("idcard", o);
                            }
                        }
                        else {
                            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                            if (idCardLast == idCardY[idCardMod]) {
                                return ei._success_rule("idcard", o);
                            }
                            else {
                                return ei._error("idcard", o);
                            }
                        }
                    }
                }
                else {
                    return ei._error("idcard", o);
                }
            },

            "equal": function (ei, v, p, o)
            {
                var pair = $(p);
                if (0 == pair.length || pair.val() != v) {
                    return ei._error("equal", o);
                }
                else {
                    return ei._success_rule("equal", o);
                }
            },

            "ajax": function (ei, v, p, o)
            {
                // 为ajax处理注册自定义事件
                // HTML中执行相关的AJAX时，需要发送事件 easyform-ajax 来通知 easyinput
                // 该事件只有一个bool参数，easyinput 会根据这个值判断ajax验证是否成功
                ei.input.delegate("", "easyform-ajax", function (e, p)
                    {
                        ei.input.unbind("easyform-ajax");

                        if (false == p) {
                            return ei._error("ajax", o);
                        }
                        else {
                            return ei._success_rule("ajax", o);
                        }
                    }
                );

                eval(p);
            },

            "date": function (ei, v, p, o)
            {
                if (false == /^(\d{4})-(\d{2})-(\d{2})$/.test(v)) {
                    return ei._error("date", o);
                }
                else {
                    //Modify by Martin 2016/06/13
                    return ei._success_rule("date", o);
                    //Modify end

                    //return ei._success_rule("date");
                }
            },

            "time": function (ei, v, p, o)
            {
                if (false == /^(\d{2}):(\d{2}):(\d{2})$/.test(v)) {
                    return ei._error("time", o);
                }
                else {
                    return ei._success_rule("time", o);
                }
            },

            "datetime": function (ei, v, p, o)
            {
                if (false == /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.test(v)) {
                    return ei._error("datetime", o);
                }
                else {
                    return ei._success_rule("datetime", o);
                }
            },

            "money": function (ei, v, p, o)
            {
                if (false == /^([1-9][\d]{0,10}|0)(\.[\d]{1,2})?$/.test(v)) {
                    return ei._error("money", o);
                }
                else {
                    return ei._success_rule("money", o);
                }
            },

            "number": function (ei, v, p, o)
            {
                if (false == /^\d{1,}$/.test(v)) {
                    return ei._error("number", o);
                }
                else {
                    return ei._success_rule("number", o);
                }
            },

            "float": function (ei, v, p, o)
            {
                var range = p.split(" ");

                //如果长度设置为 float:6 这样的格式
                //必须定义整数和小数的位数
                if (range.length != 2) {
                    return ei._error("float", o);
                }
                else if (range[0] + range[1] > 16) {
                    console.warn("您的" + ei.input.id + "float规则配置可能不正确!请保证整数位数+小数位数 < 16");
                }

                var pattern = new RegExp("^([1-9][\\d]{0," + range[0] + "}|0)(\\.[\\d]{1," + range[1] + "})?$");

                if (false == pattern.test(v)) {
                    return ei._error("float", o);
                }
                else {
                    return ei._success_rule("float", o);
                }
            },

            "uint": function (ei, v, p, o)
            {
                v = parseInt(v);

                var range = p.trim().split(" ");

                if ("" == p.trim()) {
                    console.warn("您的" + ei.input.id + "uint规则，没有设置值域!");
                    range[0] = 0;
                }

                if (range.length == 1) {
                    range[1] = 999999999999999;
                }

                range[0] = parseInt(range[0]);
                range[1] = parseInt(range[1]);

                if (isNaN(v) || isNaN(range[0]) || isNaN(range[1]) || v < range[0] || v > range[1] || v < 0) {
                    return ei._error("uint", o);
                }
                else {
                    return ei._success_rule("uint", o);
                }
            },

            "regex": function (ei, v, p, o)
            {
                var pattern = new RegExp(p);

                if (false == pattern.test(v)) {
                    return ei._error("regex", o);
                }
                else {
                    return ei._success_rule("regex", o);
                }
            }
        },

        destructor: function ()
        {
            //重置事件
            this.error = null;
            this.success = null;

            //解除实时验证
            this.input.off("blur");

            delete this;
        }
    };

    $.fn.easyinput = function (options)
    {
        var check = new _easyinput(this, options);

        return check.init();
    };

})(jQuery, window, document);

//easytip
(function ($, window, document, undefined)
{
    var _easytip = function (ele, opt)
    {
        this.parent = ele;
        this.is_show = false;

        if (0 == this.parent.length) {
            throw new Error("easytip's is null !");
        }

        this.defaults = {
            left: 0,
            top: 0,
            position: "right",          //top, left, bottom, right
            disappear: "other",       	//self, other, lost-focus, none, N seconds, out
            speed: "fast",
            class: "easy-white",
            arrow: "bottom",          	//top, left, bottom, right 自动，手动配置无效
            onshow: null,               //事件
            onclose: null,               //事件
            hover_show: "false"			//鼠标移动到绑定目标时，是否自动出现
        };

        this._fun_cache = Object();    //响应函数缓存，用来保存show里面自动添加的click函数，以便于后面的unbind针对性的一个一个删除

        //从控件的 data-easytip中读取配置信息
        // var data = easy_load_options(ele[0].id, "easytip"); // # by galandeo, fix bug
        var data = easy_load_options(ele[0], "easytip");

        this.options = $.extend({}, this.defaults, opt, data);

        this.id = "easytip-div-main-" + ele[0].id;
    };

    _easytip.prototype = {

        init: function ()
        {
            var tip = $("#" + this.id);

            var $this = this;

            //同一个控件不会多次初始化。
            if (tip.length == 0) {
                $(document.body).append("<div id=\"" + this.id + "\"><div class=\"easytip-text\"></div></div>");

                tip = $("#" + this.id);
                var text = $("#" + this.id + " .easytip-text");

                tip.css({
                        "text-align": "left",
                        "display": "none",
                        "position": "absolute",
                        "z-index": 9999
                    }
                );

                text.css({
                        "text-align": "left",
                        "min-width": "120px"
                    }
                );

                tip.append("<div class=\"easytip-arrow\"></div>");
                var arrow = $("#" + this.id + " .easytip-arrow");
                arrow.css({
                        "padding": "0",
                        "margin": "0",
                        "width": "0",
                        "height": "0",
                        "position": "absolute",
                        "border": "10px solid"
                    }
                );

                if (this.options.hover_show == "true") {
                    this.options.disappear = "none";
                    this.options.speed = 1;
                    this.parent.hover(function ()
                        {
                            $this.show();
                        }, function ()
                        {
                            $this.close();
                        }
                    );
                }
            }

            return this;
        },

        _size: function ()
        {
            var parent = this.parent;
            var tip = $("#" + this.id);

            if (tip.width() > 300) {
                tip.width(300);
            }
        },

        _css: function ()
        {
            var tip = $("#" + this.id);
            var text = $("#" + this.id + " .easytip-text");
            var arrow = $("#" + this.id + " .easytip-arrow");

            text.addClass(this.options.class);

            arrow.css("border-color", "transparent transparent transparent transparent");
            tip.css("box-sizing", "content-box");
        },

        _arrow: function ()
        {
            var tip = $("#" + this.id);
            var text = $("#" + this.id + " .easytip-text");
            var arrow = $("#" + this.id + " .easytip-arrow");

            switch (this.options.arrow) {
                case "top":
                    arrow.css({
                            "left": "25px",
                            "top": -arrow.outerHeight(),
                            "border-bottom-color": text.css("borderTopColor")
                        }
                    );
                    break;

                case "left":
                    arrow.css({
                            "left": -arrow.outerWidth(),
                            "top": tip.innerHeight() / 2 - arrow.outerHeight() / 2,
                            "border-right-color": text.css("borderTopColor")
                        }
                    );
                    break;

                case "bottom":
                    arrow.css({
                            "left": "25px",
                            "top": tip.innerHeight(),
                            "border-top-color": text.css("borderTopColor")
                        }
                    );
                    break;

                case "right":
                    arrow.css({
                            "left": tip.outerWidth(),
                            "top": tip.innerHeight() / 2 - arrow.outerHeight() / 2,
                            "border-left-color": text.css("borderTopColor")
                        }
                    );
                    break;
            }
        },

        _position: function ()
        {
            var tip = $("#" + this.id);
            var text = $("#" + this.id + " .easytip-text");
            var arrow = $("#" + this.id + " .easytip-arrow");
            var offset = $(this.parent).offset();
            var size = {
                width: $(this.parent).outerWidth(),
                height: $(this.parent).outerHeight()
            };

            switch (this.options.position) {
                case "top":

                    //tip.css("left", offset.left - this.padding);
                    tip.css("left", offset.left);
                    tip.css("top", offset.top - tip.outerHeight() - arrow.outerHeight() / 2);
                    this.options.arrow = "bottom";

                    break;

                case "left":

                    tip.css("left", offset.left - tip.outerWidth() - arrow.outerWidth() / 2);
                    tip.css("top", offset.top - (tip.outerHeight() - size.height) / 2);
                    this.options.arrow = "right";

                    break;

                case "bottom":

                    //tip.css("left", offset.left - this.padding);
                    tip.css("left", offset.left);
                    tip.css("top", offset.top + size.height + arrow.outerHeight() / 2);
                    this.options.arrow = "top";

                    break;

                case "right":

                    tip.css("left", offset.left + size.width + arrow.outerWidth() / 2);
                    tip.css("top", offset.top - (tip.outerHeight() - size.height) / 2);
                    this.options.arrow = "left";

                    break;
            }

            var left = parseInt(tip.css("left"));
            var top = parseInt(tip.css("top"));

            tip.css("left", parseInt(this.options.left) + left);
            tip.css("top", parseInt(this.options.top) + top);
        },

        close: function (fn)
        {
            var tip = $("#" + this.id);
            var parent = this.parent;
            var onclose = this.options.onclose;
            this.is_show = false;

            //onclose事件
            if (!!onclose) {
                onclose(parent, tip[0]);
            }

            tip.fadeOut(this.options.speed, fn);
        },

        _show: function ()
        {
            var tip = $("#" + this.id);
            var text = $("#" + this.id + " .easytip-text");
            var arrow = $("#" + this.id + " .easytip-arrow");
            var speed = this.options.speed;
            var disappear = this.options.disappear;
            var parent = this.parent;
            var $this = this;
            this.is_show = true;

            if (this.options.hover_show == "true") {
                tip.show();
                return;
            }

            tip.fadeIn(speed, function ()
                {
                    if (!isNaN(disappear)) {
                        //如果disappear是数字，则倒计时disappear毫秒后消失
                        setTimeout(function ()
                            {
                                $this.close();

                            }, disappear
                        );
                    }
                    else if (disappear == "self" || disappear == "other") {
                        $(document).bind('click', $this._fun_cache[tip[0].id] = function (e)
                            {
                                if (disappear == "self" && e.target == text[0]) {
                                    $this.close(function ()
                                        {
                                            $(document).unbind("click", $this._fun_cache[tip[0].id]);
                                        }
                                    );

                                }
                                else if (disappear == "other" && e.target != tip[0]) {
                                    $this.close(function ()
                                        {
                                            $(document).unbind("click", $this._fun_cache[tip[0].id]);
                                        }
                                    );
                                }
                            }
                        );
                    }
                    else if (disappear == "lost-focus") {
                        $(parent).focusout(function ()
                            {
                                $this.close(function ()
                                    {
                                        $(parent).unbind("focusout");
                                    }
                                );
                            }
                        );
                    }

                }
            );
        },

        show: function (msg)
        {
            var tip = $("#" + this.id);
            var text = $("#" + this.id + " .easytip-text");
            var arrow = $("#" + this.id + " .easytip-arrow");
            var speed = this.options.speed;
            var disappear = this.options.disappear;
            var parent = this.parent;
            var $this = this;
            var onshow = this.options.onshow;

            if (!msg) {
                msg = parent.data("easytip-message");
            }

            text.html(msg);

            this._size();
            this._css();
            this._position();
            this._arrow();

            if ("none" == tip.css("display")) {
                //onshow事件
                if (!!onshow) {
                    onshow(parent, tip[0]);
                }
                $this._show();
            }
            else {
                tip.hide(1, function ()
                    {
                        if (!!onshow) {
                            onshow(parent, tip[0]);
                        }

                        $this._show();
                    }
                );
            }
        }
    };

    $.fn.easytip = function (options)
    {
        var tip = new _easytip(this, options);

        return tip.init();
    };

})(jQuery, window, document);