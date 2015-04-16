

jQuery(function ($) {

    //guardo el contenido de los divs de cada poblema
    $obj1 = $('#ejtest_single1');
    $obj2 = $('#ejtest_multi1');
    $obj3 = $('#ejtest_input1');
    $obj4 = $('#ejtest_gapfill1');
    $obj1html = $('#ejtest_single1').html();
    $obj2html = $('#ejtest_multi1').html();
    $obj3html = $('#ejtest_input1').html();
    $obj4html = $('#ejtest_gapfill1').html();




var obj_ejtest_single1 = {
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
    "legend": "Don Quijote 1",
    "random": true,
    "weighting": 100,
    "lighting": 0,
    "icons": "csshexent",
    "storage": "local",
    "showstorage": true,
    "fillfromstorage": true,
    "delstorage": true
    //"onready": function () { alert("onready ejtest_single1"); },
    //"oncheck": function () { alert("oncheck ejtest_single1"); },
    //"oncomplete": function () { alert("oncomplete ejtest_single1"); },
    //"onok": function () { alert("onok ejtest_single1"); },
    //"onko": function () { alert("onko ejtest_single1"); }
};
    //jsGeork.Questions.Question(obj_ejtest_single1);






var obj_ejtest_multi1 = {
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
    "legend": "Don Quijote 2",
    "hint": true,
    "random": true,
    "weighting": 100,
    "lighting": 0,
    "icons": "csshexent",
    "storage": "local",
    "showstorage": true,
    "fillfromstorage": true,
    "delstorage": true,
    //"onready": function () { alert("onready ejtest_multi1"); },
    //"oncheck": function () { alert("oncheck ejtest_multi1"); },
    //"oncomplete": function () { alert("oncomplete ejtest_multi1"); },
    "onok": function () { alert("onok ejtest_multi1"); }
    //"onko": function () { alert("onko ejtest_multi1"); }
};
    //jsGeork.Questions.Question(obj_ejtest_multi1);






var obj_ejtest_input1 = {
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
    "attempts": 1
    //"onready": function () { alert("onready ejtest_input1"); },
    //"oncheck": function () { alert("oncheck ejtest_input1"); },
    //"oncomplete": function () { alert("oncomplete ejtest_input1"); },
    //"onok": function () { alert("onok ejtest_input1"); },
    //"onko": function () { alert("onko ejtest_input1"); }
};
//jsGeork.Questions.Question(obj_ejtest_input1);



var obj_ejtest_gapfill1 = {
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
    "legend": "Don Quijote 4",
    "button": "Entrega",
    "clase": "",
    "weighting": 100,
    "attempts": 5,
    "hint": true,
    "fillfromstorage": true
    //"onready": function () { alert("onready ejtest_gapfill1"); },
    //"oncheck": function () { alert("oncheck ejtest_gapfill1"); },
    //"oncomplete": function () { alert("oncomplete ejtest_gapfill1"); },
    //"onok": function () { alert("onok ejtest_gapfill1"); $("#ejtest_gapfill1_onok").show(); },
    //"onko": function () { alert("onko ejtest_gapfill1"); $("#ejtest_gapfill1_onko").show(); }
};
//jsGeork.Questions.Question(obj_ejtest_gapfill1);



var obj_test = {
    id: "myprefix_ptt_identifier",
    nametest:"",
    form: true,
    fieldset: true,
    legend: "",
    "type": "",
    button: "",
    caption: "",
    summary: "",
    details: "",
    inside: true,
    random: false,
    "flow": "slide",
    "slidercolor": "",
    "sliderinfo": "",
    "qbase": 10,
    "threshold": 50,
    "icons": "csshexent",
    "storage": "local", //local o session
    "storagekey": "jsgeork"
    //"onready": function () { alert("onready ejtest"); },
    //"oncheck": function () { alert("oncheck ejtest"); },
    //"onok": function () { alert("onok ejtest"); $("#ejtest_onok").show(); },
    //"onko": function () { alert("onko ejtest"); $("#ejtest_onko").show(); }
}
//jsGeork.Questions.Test(obj_test, obj_ejtest_single1, obj_ejtest_multi1, obj_ejtest_input1, obj_ejtest_gapfill1);



    //---------------------------------------------------
    //storage
    var stokey = "geork_gen_test";
    var stodata_def = {
        id: "ptt_identifier",
        "prefix": "myprefix_",
        nametest: "",
        form: true,
        fieldset: true,
        legend: "Examen tipo test",
        "type": "",
        button: "",
        caption: "",
        summary: "",
        details: "",
        inside: true,
        random: false,
        "flow": "slide",
        "slidercolor": "",
        "sliderinfo": "",
        "qbase": 10,
        "threshold": 50,
        "icons": "csshexent",
        "storage": "local", //local o session
        "storagekey": "jsgeork",
        onready: false,
        oncheck: false,
        oncomplete: false,
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
        stodata.formtest = $('input[name="formtest"]').is(':checked');
        stodata.fieldset = $('input[name="fieldset"]').is(':checked');
        stodata.legend = $('input[name="legend"]').val();
        stodata.inside = $('input[name="inside"]').is(':checked');
        stodata.flow = $('select[name="flow"]').val();
        stodata.slidercolor = $('select[name="slidercolor"]').val();
        stodata.sliderinfo = $('select[name="sliderinfo"]').val();
        stodata.type = $('select[name="type"]').val();
        stodata.button = $('input[name="btntext"]').val();
        stodata.nametest = $('input[name="nametest"]').val();
        stodata.caption = $('input[name="caption"]').val();
        stodata.details = $('input[name="details"]').val();
        stodata.summary = $('input[name="summary"]').val();
        stodata.icons = $('select[name="icons"]').val();
        stodata.qbase = $('select[name="qbase"]').val();
        stodata.threshold = $('select[name="threshold"]').val();
        stodata.random = $('input[name="random"]').is(':checked');
        stodata.storage = $('select[name="storage"]').val();
        stodata.storagekey = $('input[name="storagekey"]').val();
        stodata.showstorage = $('input[name="showstorage"]').is(':checked');
        stodata.delstorage = $('input[name="delstorage"]').is(':checked');
        stodata.onready = $('input[name="onready"]').is(':checked');
        stodata.oncheck = $('input[name="oncheck"]').is(':checked');
        stodata.onok = $('input[name="onok"]').is(':checked');
        stodata.onko = $('input[name="onko"]').is(':checked');
    }
    function setData() {
        $('input[name="idact"]').val(stodata.id);
        $('input[name="idprefix"]').val(stodata.prefix);
        $('input[name="formtest"]').prop('checked', stodata.formtest);
        $('input[name="fieldset"]').prop('checked', stodata.fieldset);
        $('input[name="legend"]').val(stodata.legend);
        $('input[name="inside"]').prop('checked', stodata.inside);
        $('select[name="flow"]').val(stodata.flow);
        $('select[name="slidercolor"]').val(stodata.slidercolor);
        $('select[name="sliderinfo"]').val(stodata.sliderinfo);
        $('select[name="type"]').val(stodata.type);
        $('input[name="btntext"]').val(stodata.button);
        $('input[name="nametest"]').val(stodata.nametest);
        $('input[name="caption"]').val(stodata.caption);
        $('input[name="details"]').val(stodata.details);
        $('input[name="summary"]').val(stodata.summary);
        $('select[name="icons"]').val(stodata.icons);
        $('select[name="qbase"]').val(stodata.qbase);
        $('select[name="threshold"]').val(stodata.threshold);
        $('input[name="random"]').prop('checked', stodata.random);
        $('select[name="storage"]').val(stodata.storage);
        $('input[name="storagekey"]').val(stodata.storagekey);
        $('input[name="showstorage"]').prop('checked', stodata.showstorage);
        $('input[name="delstorage"]').prop('checked', stodata.delstorage);
        $('input[name="onready"]').prop('checked', stodata.onready);
        $('input[name="oncheck"]').prop('checked', stodata.oncheck);
        $('input[name="onok"]').prop('checked', stodata.onok);
        $('input[name="onko"]').prop('checked', stodata.onko);
        $('input[name = "fieldset"]').trigger("change");
        $('input[name = "inside"]').trigger("change");
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


        hout += '<!-- $addjqueryhead$ -->\n';
        hout += '<!-- $addjsgeorkhead$ -->\n';
        hout += '<div id="' + finalid + '">\n';
        hout += '   <div id="' + finalid + '_info_aria" class="CSSInfoTextPtt">Resuelva el test...</div>\n';
        hout += '   <div style="display: none;" aria-hidden="true">\n';
        hout += '       <div data-info-ok="' + finalid + '">\n';
        hout += '           <!-- El interior de este bloque se mostrará cuando se supere la prueba -->\n';
        hout += '           <span class="CSSMsgSuccess">¡PRUEBA SUPERADA!</span>\n';
        hout += '       </div>\n';
        hout += '       <div data-info-ko="' + finalid + '">\n';
        hout += '           <!-- El interior de este bloque se mostrará cuando no se supere la prueba -->\n';
        hout += '           <span class="CSSMsgFail">¡Prueba NO superada!</span>\n';
        hout += '       </div>\n';
        hout += '       <div data-info-bottom="' + finalid + '">\n';
        hout += '           <!-- El interior de este bloque se moverá al final de los controles del test -->\n';
        hout += '           Responda todas las preguntas antes de pulsar en el botón para comprobar las respuestas.\n';
        hout += '       </div>\n';
        hout += '   </div>\n';
        hout += '</div>\n';

        sout += '<script>\n';
        sout += 'var obj_' + finalid + ' = {\n';
        sout += '   "id": "' + finalid + '",\n';

        //nametest
        if ($('input[name="nametest"]', $frm).val()) {
            obj_test.name = $('input[name="nametest"]', $frm).val();
            sout += '   "name": "' + $('input[name="nametest"]', $frm).val() + '",\n';
        } else {
            obj_test.name = "";
            //sout += '   "name": "",\n';
        }
        //form
        if ($('input[name="formtest"]', $frm).is(":checked")) {
            obj_test.form = true;
            sout += '   "form": true,\n';
        } else {
            obj_test.form = false;
            sout += '   "form": false,\n';
        }
        //fieldset
        if ($('input[name="fieldset"]', $frm).is(":checked")) {
            obj_test.fieldset = true;
            sout += '   "fieldset": true,\n';
        } else {
            obj_test.fieldset = false;
            sout += '   "fieldset": false,\n';
        }
        //legend
        obj_test.legend = $('input[name="legend"]', $frm).val();
        sout += '   "legend": "' + $('input[name="legend"]', $frm).val() + '",\n';
        //inside
        if ($('input[name="inside"]', $frm).is(":checked")) {
            obj_test.inside = true;
            sout += '   "inside": true,\n';
        } else {
            obj_test.inside = false;
            sout += '   "inside": false,\n';
        }
        //flow
        if ($('select[name="flow"]', $frm).val()) {
            obj_test.flow = $('select[name="flow"]', $frm).val();
            sout += '   "flow": "' + $('select[name="flow"]', $frm).val() + '",\n';
        } else {
            obj_test.flow = "";
        }
        //slidercolor
        if ($('select[name="slidercolor"]', $frm).val()) {
            obj_test.slidercolor = $('select[name="slidercolor"]', $frm).val();
            sout += '   "slidercolor": "' + $('select[name="slidercolor"]', $frm).val() + '",\n';
        } else {
            obj_test.slidercolor = "";
        }
        //sliderinfo
        if ($('select[name="sliderinfo"]', $frm).val()) {
            obj_test.sliderinfo = $('select[name="sliderinfo"]', $frm).val();
            sout += '   "sliderinfo": "' + $('select[name="sliderinfo"]', $frm).val() + '",\n';
        } else {
            obj_test.sliderinfo = "";
        }
        //type
        if ($('select[name="type"]', $frm).val()) {
            obj_test.type = $('select[name="type"]', $frm).val();
            sout += '   "type": "' + $('select[name="type"]', $frm).val() + '",\n';
        } else {
            obj_test.type = "test";
        }
        //button
        if ($('input[name="btntext"]', $frm).val()) {
            obj_test.button = $('input[name="btntext"]', $frm).val();
            sout += '   "button": "' + $('input[name="btntext"]', $frm).val() + '",\n';
        } else {
            obj_test.button = "";
            //sout += '   "button": "",\n';
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
            sout += '   "icons": "",\n';
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
            obj_test.threshold = 50;
        }
        //random
        if ($('input[name="random"]', $frm).is(":checked")) {
            obj_test.random = true;
            sout += '   "random": true,\n';
        } else {
            obj_test.random = false;
            sout += '   "random": false,\n';
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
        //showstorage
        if ($('input[name="showstorage"]', $frm).is(":checked")) {
            obj_test.showstorage = true;
            sout += '   "showstorage": true,\n';
        } else {
            obj_test.showstorage = false;
            sout += '   "showstorage": false,\n';
        }
        //delstorage
        if ($('input[name="delstorage"]', $frm).is(":checked")) {
            obj_test.delstorage = true;
            sout += '   "delstorage": true,\n';
        } else {
            obj_test.delstorage = false;
            sout += '   "delstorage": false,\n';
        }
        //onready
        if ($('input[name="onready"]', $frm).is(":checked")) {
            obj_test.onready = function () { alert("onready\n\ntotal: " + this.total + '\nthreshold: ' + this.threshold); };
            sout += '   "onready": function () { alert("onready\\n\\ntotal: " + this.total + "\n\nthreshold: " + this.threshold); },\n';
        } else {
            obj_test.onready = undefined;
            //sout += '   "onready": undefined,\n';
        }
        //oncheck
        if ($('input[name="oncheck"]', $frm).is(":checked")) {
            obj_test.oncheck = function () {
                alert("oncheck\n\nscore: " + this.score);
                //alert(JSON.stringify(this.objscore));
                console.log(this.objscore);
                console.log(jsGeork.Questions.Test.objscore);
            };
            sout += '   "oncheck": function () { alert("oncheck\\n\\nscore: " + this.score); },\n';
        } else {
            obj_test.oncheck = undefined;
            //sout += '   "oncheck": undefined,\n';
        }
        //onok
        if ($('input[name="onok"]', $frm).is(":checked")) {
            obj_test.onok = function () { alert('onok (score>=threshold)\n\ntotal: ' + this.total + '\nthreshold: ' + this.threshold + '\nscore: ' + this.score); };
            sout += '   "onok": function () { alert("onok\\n\\ntotal: " + this.total + "\\nthreshold: " + this.threshold + "\\nscore: " + this.score); },\n';
        } else {
            obj_test.onok = undefined;
            //sout += '   "onok": undefined,\n';
        }
        //onko
        if ($('input[name="onko"]', $frm).is(":checked")) {
            obj_test.onko = function () { alert('onko (score<threshold)\n\ntotal: ' + this.total + '\nthreshold: ' + this.threshold + '\nscore: ' + this.score); };
            sout += '   "onko": function () { alert("onko\\n\\ntotal: " + this.total + "\\nthreshold: " + this.threshold + "\\nscore: " + this.score); },\n';
        } else {
            obj_test.onko = undefined;
            //sout += '   "onko": undefined,\n';
        }


        //quito la ultima coma ,
        sout = sout.slice(0, -2);

        sout += '\n};\n';
        sout += 'jsGeork.Questions.Test(obj_' + finalid + ',obj1,objn);\n';
        sout += '<\/script>\n';


        $('#bloqueej').html(hout); //modifico el html del ejemplo en funcionamiento
        $("#txtareahtml").text(hout);
        $("#textcode").text(hout + '\n\n' + sout);

        //guardo valores
        saveData();
        storeData();


    } //end setQuestion


    //volvemos a construir la página inicial
    function remakeHTML() {

        //restauro el contnido de los divs
        $obj1.html($obj1html);
        $obj2.html($obj2html);
        $obj3.html($obj3html);
        $obj4.html($obj4html);

        //muevo todos los bloques de problemas a #htmlorig
        $('#htmlorig').html("");
        $('#htmlorig').append($obj1, $obj2, $obj3, $obj4);
        //$('#htmlorig').append($obj2);
        //$('#htmlorig').append($obj3);
        //$('#htmlorig').append($obj4);
        $obj1.show();
        $obj2.show();
        $obj3.show();
        $obj4.show();


    }



    $('input[name="idact"]').on("change keyup", setId);
    $('input[name="idprefix"]').on("change keyup", setId);

    $('input[name="fieldset"]', $frm).change(function () {
        if ($('input[name="fieldset"]', $frm).is(":checked")) {
            $('input[name="legend"]', $frm).show();
            $('label[for="legend"]', $frm).show();
        } else {
            $('input[name="legend"]', $frm).hide();
            $('label[for="legend"]', $frm).hide();
        }
    });
    $('input[name="inside"], select[name="flow"]', $frm).change(function () {
        if ($('input[name="inside"]', $frm).is(":checked") || $('select[name="flow"]', $frm).val()) {
            $('#randomblock', $frm).show();
        } else {
            $('#randomblock', $frm).hide();
        }
        if ($('select[name="flow"]', $frm).val()==="train") {
            $('#trainblock', $frm).show();
        } else {
            $('#trainblock', $frm).hide();
        }
    });

    //borrar el storage
    $("#delsto").on("click", delData);
    $("#delstokey").on("click", function () {
        delKeySto($('#storagekey').val())
        }
    );
    $("#stokeyname").text(stokey);

    $("#btngenera").on("click", function () {
        remakeHTML();
        setQuestion();
        jsGeork.Questions.Test(obj_test, obj_ejtest_single1, obj_ejtest_multi1, obj_ejtest_input1, obj_ejtest_gapfill1);
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

