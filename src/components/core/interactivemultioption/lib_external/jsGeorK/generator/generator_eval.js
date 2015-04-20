

jQuery(function ($) {


    var obj_ejeval_single1 = {
        "id": "ejtest_single1",
        "type": "single",
        "opt": [
            {
                "text": "Cervantes",
                "answer": "opta",
                "weight": 100
            },
            {
                "text": "Góngora",
                "answer": "optb",
                "weight": 0
            },
            {
                "text": "Quevedo",
                "answer": "optb",
                "weight": 0
            },
            {
                "text": "Unamuno",
                "answer": "optb",
                "weight": 0
            }
        ],
        "fieldset": true,
        "name": "Don Quijote de la Mancha - 1",
        "legend": "Don Quijote 1",
        "random": true,
        "weighting": 100,
        "lighting": 0,
        "icons": "csshexent",
        "storage": "local", //local o session
        "storagekey": "jsgeork",
        "showstorage": true
        //"onready": function () { alert("onready ejtest_single1"); },
        //"oncheck": function () { alert("oncheck ejtest_single1"); },
        //"oncomplete": function () { alert("oncomplete ejtest_single1"); },
        //"onok": function () { alert("onok ejtest_single1"); },
        //"onko": function () { alert("onko ejtest_single1"); }
    };
    jsGeork.Questions.Question(obj_ejeval_single1);






    var obj_ejeval_multi1 = {
        "id": "ejtest_multi1",
        "type": "multi",
        "opt": [
            {
                "text": "La primera parte se publicó en 1605",
                "answer": "opta",
                "select": true
            },
            {
                "text": "La segunda parte se publicó en 1610",
                "answer": "optb",
                "select": false
            },
            {
                "text": "La cabalgadura de Sancho Panza se llama Genitor",
                "answer": "optc",
                "select": false
            },
            {
                "text": "El protagonista es Alonso Quijano",
                "answer": "optd",
                "select": true
            },
            {
                "text": "Don Quijote es un gran admirador de Amadís de Gaula",
                "answer": "opte",
                "select": true
            }
        ],
        "fieldset": true,
        "name": "Don Quijote de la Mancha - 2",
        "legend": "Don Quijote 2",
        "hint": true,
        "random": true,
        "weighting": 100,
        "lighting": 0,
        "icons": "csshexent",
        "storage": "local", //local o session
        "storagekey": "jsgeork",
        "showstorage": true
        //"onready": function () { alert("onready ejtest_multi1"); },
        //"oncheck": function () { alert("oncheck ejtest_multi1"); },
        //"oncomplete": function () { alert("oncomplete ejtest_multi1"); },
        //"onok": function () { alert("onok ejtest_multi1"); },
        //"onko": function () { alert("onko ejtest_multi1"); }
    };
    jsGeork.Questions.Question(obj_ejeval_multi1);






    var obj_ejeval_input1 = {
        "id": "ejtest_input1",
        "type": "input",
        "boxs": {
            "box1": {
                "type": "number",
                "values": [],
                "weight": 100,
                "placeholder": "????",
                "autocomplete": "",
                "adjustgaps": "all"
            }
        },
        "fieldset": true,
        "name": "Don Quijote de la Mancha - 3",
        "legend": "Don Quijote 3",
        "hint": true,
        "btnhint": "?",
        "weighting": 100,
        "lighting": 0,
        "icons": "csshexent",
        "storage": "local",
        "showstorage": true,
        "fillfromstorage": true,
        "delstorage": true,
        "attempts": 1,
        "storage": "local", //local o session
        "storagekey": "jsgeork",
        "showstorage": true
        //"onready": function () { alert("onready ejtest_input1"); },
        //"oncheck": function () { alert("oncheck ejtest_input1"); },
        //"oncomplete": function () { alert("oncomplete ejtest_input1"); },
        //"onok": function () { alert("onok ejtest_input1"); },
        //"onko": function () { alert("onko ejtest_input1"); }
    };
    jsGeork.Questions.Question(obj_ejeval_input1);



    var obj_ejeval_gapfill1 = {
        id: "ejtest_gapfill1",
        "type": "gapfill",
        "makeqs": "ejtest_gapfill1", //elemento en el que se buscaran y generarán los huecos
        "gaps": {
            "gap1": {
                "words": ["estepa", "pradera", "tundra", "Tierra"],
                "weight": 100,
                "showwords": true,
                "placeholder": "",              //(string) atributo placeholder del input
                "casesensitive": false,         //(boolean) si el hueco es sensible a mayúsculas
                "autocomplete": "",             //(string)(on,off) Si hay que poner el atributo autocomplete en el input
                "adjustgaps": ""               //(string)("" o none,all,size,width) 
            },
            "gap2": {
                "words": ["señor", "caballero", "paladín"],
                "showwords": true,
                "weight": 100,
                "placeholder": "lléname",              //(string) atributo placeholder del input
                "casesensitive": false,         //(boolean) si el hueco es sensible a mayúsculas
                "autocomplete": "",             //(string)(on,off) Si hay que poner el atributo autocomplete en el input
                "adjustgaps": "all"               //(string)("" o none,all,size,width) 
            },
            "gap3": {
                "words": ["perro", "can", "conejo"],
                "weight": 50,
                "placeholder": "?",              //(string) atributo placeholder del input
                "casesensitive": false,         //(boolean) si el hueco es sensible a mayúsculas
                "autocomplete": "",             //(string)(on,off) Si hay que poner el atributo autocomplete en el input
                "adjustgaps": "size"            //(string)("" o none,all,size,maxlength) 
            }
        },
        "adjustgaps": "full",
        "fieldset": true,
        "name": "Don Quijote de la Mancha - 4",
        "legend": "Don Quijote 4",
        "button": "Entrega",
        "clase": "",
        "weighting": 100,
        "attempts": 5,
        "hint": true,
        "fillfromstorage": true,
        "storage": "local", //local o session
        "storagekey": "jsgeork",
        "showstorage": true
        //"onready": function () { alert("onready ejtest_gapfill1"); },
        //"oncheck": function () { alert("oncheck ejtest_gapfill1"); },
        //"oncomplete": function () { alert("oncomplete ejtest_gapfill1"); },
        //"onok": function () { alert("onok ejtest_gapfill1"); $("#ejtest_gapfill1_onok").show(); },
        //"onko": function () { alert("onko ejtest_gapfill1"); $("#ejtest_gapfill1_onko").show(); }
    };
    jsGeork.Questions.Question(obj_ejeval_gapfill1);



    var obj_test = {
        id: "myprefix_tea_identifier",
        caption: "",
        summary: "",
        details: "",
        refresh: true,
        "timer": 0,
        "names": "",
        "qbase": 10,
        "threshold": 100,
        "icons": "csshexent"
        //"onok": function () { alert("onok ejtest"); $("#ejtest_onok").show(); },
        //"onko": function () { alert("onko ejtest"); $("#ejtest_onko").show(); }
    }
    //jsGeork.Questions.Eval(obj_test, obj_ejeval_single1, obj_ejeval_multi1, obj_ejeval_input1, obj_ejeval_gapfill1);



    //---------------------------------------------------
    //storage
    var stokey = "geork_gen_eval";
    var stodata_def = {
        id: "tea_identifier",
        "prefix": "myprefix_",
        caption: "",
        summary: "",
        details: "",
        refresh: true,
        "timer": 0,
        "names": "",
        "qbase": 10,
        "threshold": 100,
        "icons": "csshexent",
        storage: "",
        storagekey: "jsgeork",
        "url": "",
        onok: false,
        onko: false
    };
    var stodata = $.extend({}, stodata_def);

    function storeData() {
        if (localStorage) {
            localStorage.setItem(stokey, JSON.stringify(stodata));
        }
    }
    function getData() {
        if (localStorage) {
            stodata = JSON.parse(localStorage.getItem(stokey)) || stodata_def;
        }
    }
    function delData() {
        if (localStorage) {
            localStorage.removeItem(stokey);
        }
        stodata = {};
        stodata = $.extend({}, stodata_def);
        setData();
        setQuestion();
        alert("OK\n\n" + JSON.stringify(stodata));
        $("#btngenera").trigger("click");
    }
    function delKeySto(key) {
        if (localStorage) {
            localStorage.removeItem(key);
        }
        alert("delete key '" + key + "'\n\nOK");
    }


    function saveData() {
        stodata.id = $('input[name="idact"]').val();
        stodata.prefix = $('input[name="idprefix"]').val();
        stodata.refresh = $('input[name="refresh"]').is(':checked');
        stodata.timer = $('select[name="timer"]').val();
        stodata.names = $('select[name="names"]').val();
        stodata.caption = $('input[name="caption"]').val();
        stodata.details = $('input[name="details"]').val();
        stodata.summary = $('input[name="summary"]').val();
        stodata.icons = $('select[name="icons"]').val();
        stodata.qbase = $('select[name="qbase"]').val();
        stodata.threshold = $('select[name="threshold"]').val();
        stodata.storage = $('select[name="storage"]').val();
        stodata.storagekey = $('input[name="storagekey"]').val();
        stodata.url = $('input[name="url"]').val();
        stodata.onok = $('input[name="onok"]').is(':checked');
        stodata.onko = $('input[name="onko"]').is(':checked');
    }
    function setData() {
        $('input[name="idact"]').val(stodata.id);
        $('input[name="idprefix"]').val(stodata.prefix);
        $('input[name="refresh"]').prop('checked', stodata.refresh);
        $('select[name="timer"]').val(stodata.timer);
        $('select[name="names"]').val(stodata.names);
        $('input[name="caption"]').val(stodata.caption);
        $('input[name="details"]').val(stodata.details);
        $('input[name="summary"]').val(stodata.summary);
        $('select[name="icons"]').val(stodata.icons);
        $('select[name="qbase"]').val(stodata.qbase);
        $('select[name="threshold"]').val(stodata.threshold);
        $('select[name="storage"]').val(stodata.storage);
        $('input[name="storagekey"]').val(stodata.storagekey);
        $('input[name="url"]').val(stodata.url);
        $('input[name="onok"]').prop('checked', stodata.onok);
        $('input[name="onko"]').prop('checked', stodata.onko);
    }

    //--------------------------------------------------

    var $frm = $("#frmopt");
    var finalid = "";

    function setId() {
        finalid = $('input[name="idprefix"]', $frm).val() + $('input[name="idact"]', $frm).val();
        finalid.replace(/\s+/, "");
        $("#finalid").text("id: " + finalid);
    }

    function setQuestion() {
        var sout = "";
        var hout = "";



        setId();

        obj_test.id = finalid; // pongo en el objeto de ejemplo el id final

        if (jsGeork.Questions.Question[obj_test.id]) {
            clearInterval(jsGeork.Questions.Question[obj_test.id].refresh());
        }
        

        hout += '<!-- $addjqueryhead$ -->\n';
        hout += '<!-- $addjsgeorkhead$ -->\n';
        hout += '<div id="' + finalid + '"></div>\n';
        sout += '<script>\n';
        sout += 'var obj_' + finalid + ' = {\n';
        sout += '   "id": "' + finalid + '",\n';


        //refresh
        if ($('input[name="refresh"]', $frm).is(":checked")) {
            obj_test.refresh = true;
            //sout += '   "refresh": true,\n';
        } else {
            obj_test.refresh = false;
            sout += '   "refresh": false,\n';
        }
        //timer
        if ($('select[name="timer"]', $frm).val()) {
            obj_test.timer = $('select[name="timer"]', $frm).val();
            sout += '   "timer": "' + $('select[name="timer"]', $frm).val() + '",\n';
        } else {
            obj_test.timer = 0;
        }
        //names
        if ($('select[name="names"]', $frm).val()) {
            obj_test.names = $('select[name="names"]', $frm).val();
            sout += '   "names": "' + $('select[name="names"]', $frm).val() + '",\n';
        } else {
            obj_test.names = "";
        }
        //caption
        if ($('input[name="caption"]', $frm).val()) {
            obj_test.caption = $('input[name="caption"]', $frm).val();
            sout += '   "caption": "' + $('input[name="caption"]', $frm).val() + '",\n';
        } else {
            obj_test.caption = "";
            //sout += '   "caption": "",\n';
        }
        //details
        if ($('input[name="details"]', $frm).val()) {
            obj_test.details = $('input[name="details"]', $frm).val();
            sout += '   "details": "' + $('input[name="details"]', $frm).val() + '",\n';
        } else {
            obj_test.details = "";
            //sout += '   "details": "",\n';
        }
        //summary
        if ($('input[name="summary"]', $frm).val()) {
            obj_test.summary = $('input[name="summary"]', $frm).val();
            sout += '   "summary": "' + $('input[name="summary"]', $frm).val() + '",\n';
        } else {
            obj_test.summary = "";
            //sout += '   "summary": "",\n';
        }
        //icons
        if ($('select[name="icons"]', $frm).val()) {
            obj_test.icons = $('select[name="icons"]', $frm).val();
            sout += '   "icons": "' + $('select[name="icons"]', $frm).val() + '",\n';
        } else {
            obj_test.icons = "";
            //sout += '   "icons": "",\n';
        }
        //qbase
        if ($('select[name="qbase"]', $frm).val()) {
            obj_test.qbase = $('select[name="qbase"]', $frm).val();
            sout += '   "qbase": ' + $('select[name="qbase"]', $frm).val() + ',\n';
        } else {
            obj_test.qbase = 10;
        }
        //threshold
        if ($('select[name="threshold"]', $frm).val()) {
            obj_test.threshold = $('select[name="threshold"]', $frm).val();
            sout += '   "threshold": ' + $('select[name="threshold"]', $frm).val() + ',\n';
        } else {
            obj_test.threshold = 100;
        }
        //storage
        if ($('select[name="storage"]', $frm).val()) {
            obj_test.storage = $('select[name="storage"]', $frm).val();
            sout += '   "storage": "' + $('select[name="storage"]', $frm).val() + '",\n';
        } else {
            obj_test.storage = "";
        }
        //storagekey
        if ($('input[name="storagekey"]', $frm).val()) {
            obj_test.storagekey = $('input[name="storagekey"]', $frm).val();
            sout += '   "storagekey": "' + $('input[name="storagekey"]', $frm).val() + '",\n';
        } else {
            obj_test.storagekey = "";
        }
        //url
        if ($('input[name="url"]', $frm).val()) {
            obj_test.url = $('input[name="url"]', $frm).val();
            sout += '   "url": "' + $('input[name="url"]', $frm).val() + '",\n';
        } else {
            obj_test.url = "";
        }
        //onok
        if ($('input[name="onok"]', $frm).is(":checked")) {
            if (obj_test.timer === 0) {
                obj_test.onok = function () { alert('onok (eval>=threshold)\n\eval: ' + this[obj_test.id].eval + '\nthreshold: ' + this[obj_test.id].threshold + '\ndate: ' + this[obj_test.id].date); };
                sout += '   "onok": function () { alert("onok); },\n';
            } else {
                obj_test.onok = undefined;
                sout += '   "onok": function () {  },\n';
            }
        } else {
            obj_test.onok = undefined;
            //sout += '   "onok": undefined,\n';
        }
        //onko
        if ($('input[name="onko"]', $frm).is(":checked")) {
            if (obj_test.timer === 0) {
                obj_test.onko = function () { alert('onko (eval<threshold)\n\neval: ' + this[obj_test.id].eval + '\nthreshold: ' + this[obj_test.id].threshold + '\ndate: ' + this[obj_test.id].date); };
                sout += '   "onko": function () { alert("onko (eval<threshold)\\n\neval: " + this[obj_test.id].eval + "\\nthreshold: " + this[obj_test.id].threshold + "\\ndate: " + this[obj_test.id].date); },\\n';
            } else {
                obj_test.onko = undefined;
                sout += '   "onko": function () {  },\n';
            }
        } else {
            obj_test.onko = undefined;
            //sout += '   "onko": undefined,\n';
        }


        //quito la ultima coma ,
        sout = sout.slice(0, -2);

        sout += '\n};\n';
        //la detección del storage la hace la propia biblioteca
        //if ($('select[name="storage"]', $frm).val()==="local") {
        //    sout += 'if (localStorage) { obj_' + finalid + '.storage = "local"; }\n';
        //}
        //if ($('select[name="storage"]', $frm).val() === "session") {
        //    sout += 'if (sessionStorage) { obj_' + finalid + '.storage = "session"; }\n';
        //}
        sout += 'jsGeork.Questions.Eval(obj_' + finalid + ', obj1, objn);\n';
        sout += '<\/script>\n';


        $('#bloqueej').html(hout); //modifico el html del ejemplo en funcionamiento
        $("#txtareahtml").text(hout);
        $("#textcode").text(hout + '\n' + sout);

        //guardo valores
        saveData();
        storeData();


    } //end setQuestion

    $('input[name="idact"]').on("change keyup", setId);
    $('input[name="idprefix"]').on("change keyup", setId);


    //borrar el storage
    $("#delsto").on("click", delData);
    $("#delstokey").on("click", function () {
        delKeySto($('#storagekey').val())
        }
    );
    $("#stokeyname").text(stokey);

    $("#btngenera").on("click", function () {
        setQuestion();
        jsGeork.Questions.Eval(obj_test, obj_ejeval_single1, obj_ejeval_multi1, obj_ejeval_input1, obj_ejeval_gapfill1);
        $("#bloqueej")[0].scrollIntoView();
    });

    $("#selcode").on("click", function () {
        $("#textcode").select();

    });

    $("#advopt_toggle").on("click", function () {
        $("#advopt").toggle();
    });


    //leo valores del storage y los pongo
    getData();
    setData();

    $("#btngenera").trigger("click");

});

