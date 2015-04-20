jQuery(function ($) {





    //valores por defecto
    var objMulti1 = {
        id: "myprefix_pms_identifier",
        "type": "multi",
        fieldset: true,
        legend: "Pregunta con respuestas multiselección",
        //button: "Comprueba",
        opt: [
                {
                    text: "Option A",
                    answer: "opta",
                    select: true
                },
                {
                    text: "Option B",
                    answer: "optb",
                    select: false
                },
                {
                    text: "Option C",
                    answer: "optc",
                    select: false
                },
                {
                    text: "Option D",
                    answer: "optd",
                    select: false
                }
        ],
        clase: "",
        //list: "ol",
        random: true,
        "optsuccess": true,
        hint: true,
        "icons": "csshexent",
        "fillfromstorage": true,
        "storage": "local", //local o session
        "storagekey": "jsgeork",
        "delstorage": false,
        weighting: 100,
        lighting: 0
    };
    //jsGeork.Questions.Question(objMulti1);



    //---------------------------------------------------
    //storage
    var stokey = "geork_gen_multi";
    var stodata_def = {
        id: "pms_identifier",
        "prefix": "myprefix_",
        txta: "Option A",
        answera: "opta",
        selecta: true,
        txtb: "Option B",
        answerb: "optb",
        selectb: false,
        txtc: "Option C",
        answerc: "optc",
        selectc: false,
        txtd: "Option D",
        answerd: "optd",
        selectd: false,
        txte: "",
        answere: "",
        fieldset: true,
        legend: "Pregunta con respuestas multiselección",
        button: "",
        list: "",
        "optsuccess": true,
        hint: true,
        random: true,
        weighting: 100,
        lighting: 0,
        "icons": "csshexent",
        storage: "local",
        storagekey: "jsgeork",
        fillfromstorage: true,
        showstorage: true,
        delstorage: true,
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
        //stodata = null;
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
        stodata.txta = $('input[name="opttexta"]').val();
        stodata.answera = $('input[name="answera"]').val();
        stodata.selecta = $('input[name="selecta"]').is(':checked');
        stodata.txtb = $('input[name="opttextb"]').val();
        stodata.answerb = $('input[name="answerb"]').val();
        stodata.selectb = $('input[name="selectb"]').is(':checked');
        stodata.txtc = $('input[name="opttextc"]').val();
        stodata.answerc = $('input[name="answerc"]').val();
        stodata.selectc = $('input[name="selectc"]').is(':checked');
        stodata.txtd = $('input[name="opttextd"]').val();
        stodata.answerd = $('input[name="answerd"]').val();
        stodata.selectd = $('input[name="selectd"]').is(':checked');
        stodata.txte = $('input[name="opttexte"]').val();
        stodata.answere = $('input[name="answere"]').val();
        stodata.selecte = $('input[name="selecte"]').is(':checked');
        stodata.fieldset = $('input[name="fieldset"]').is(':checked');
        stodata.legend = $('input[name="legend"]').val();
        stodata.nameact = $('input[name="nameact"]').val();
        stodata.button = $('input[name="btntext"]').val();
        stodata.list = $('select[name="lista"]').val();
        stodata.optsuccess = $('input[name="optsuccess"]').is(':checked');
        stodata.hint = $('input[name="hint"]').is(':checked');
        stodata.random = $('input[name="random"]').is(':checked');
        stodata.weighting = $('input[name="weighting"]').val();
        stodata.lighting = $('input[name="lighting"]').val();
        stodata.icons = $('select[name="icons"]').val();
        stodata.storage = $('select[name="storage"]').val();
        stodata.fillfromstorage = $('input[name="fillfromstorage"]').is(':checked');
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
        $('input[name="opttexta"]').val(stodata.txta);
        $('input[name="answera"]').val(stodata.answera);
        $('input[name="selecta"]').prop('checked', stodata.selecta);
        $('input[name="opttextb"]').val(stodata.txtb);
        $('input[name="answerb"]').val(stodata.answerb);
        $('input[name="selectb"]').prop('checked', stodata.selectb);
        $('input[name="opttextc"]').val(stodata.txtc);
        $('input[name="answerc"]').val(stodata.answerc);
        $('input[name="selectc"]').prop('checked', stodata.selectc);
        $('input[name="opttextd"]').val(stodata.txtd);
        $('input[name="answerd"]').val(stodata.answerd);
        $('input[name="selectd"]').prop('checked', stodata.selectd);
        $('input[name="opttexte"]').val(stodata.txte);
        $('input[name="answere"]').val(stodata.answere);
        $('input[name="fieldset"]').prop('checked', stodata.fieldset);
        $('input[name="legend"]').val(stodata.legend);
        $('input[name="nameact"]').val(stodata.nameact);
        $('input[name="btntext"]').val(stodata.button);
        $('select[name="lista"]').val(stodata.list);
        $('input[name="optsuccess"]').prop('checked', stodata.optsuccess);
        $('input[name="hint"]').prop('checked', stodata.hint);
        $('input[name="random"]').prop('checked', stodata.random);
        $('input[name="weighting"]').val(stodata.weighting);
        $('input[name="lighting"]').val(stodata.lighting);
        $('select[name="icons"]').val(stodata.icons);
        $('select[name="storage"]').val(stodata.storage);
        $('input[name="fillfromstorage"]').prop('checked', stodata.fillfromstorage);
        $('input[name="storagekey"]').val(stodata.storagekey);
        $('input[name="showstorage"]').prop('checked', stodata.showstorage);
        $('input[name="delstorage"]').prop('checked', stodata.delstorage);
        $('input[name="onready"]').prop('checked', stodata.onready);
        $('input[name="oncheck"]').prop('checked', stodata.oncheck);
        $('input[name="onok"]').prop('checked', stodata.onok);
        $('input[name="onko"]').prop('checked', stodata.onko);
        $('input[name = "fieldset"]').trigger("change");
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

        objMulti1.id = finalid; // pongo en el objeto de ejemplo el id final


        hout += '<!-- $addjqueryhead$ -->\n';
        hout += '<!-- $addjsgeorkhead$ -->\n';
        hout += '<div id="' + finalid + '">\n';
        hout += '   <div id="' + finalid + '_info_aria" class="CSSInfoTextPemPms">Seleccione las respuestas correctas</div>\n';
        hout += '   <div style="display: none;" aria-hidden="true">\n';
        hout += '       <div data-info-bottom="' + finalid + '">\n';
        hout += '           <!-- El interior de este bloque se moverá al final de la actividad -->\n';
        hout += '           <p>¡Suerte!</p>\n';
        hout += '       </div>\n';
        hout += '       <div data-info-ok="' + finalid + '">\n';
        hout += '           <!-- El interior de este bloque se colocará detrás del botón cuando se resuelva bien -->\n';
        hout += '           <span class="CSSMsgSuccess">¡CORRECTO!</span>\n';
        hout += '       </div>\n';
        hout += '       <div data-info-ko="' + finalid + '">\n';
        hout += '           <!-- El interior de este bloque se colocará detrás del botón cuando se resuelva mal -->\n';
        hout += '           <span class="CSSMsgFail">¡ERROR!</span>\n';
        hout += '       </div>\n';


        sout += '<script>\n';
        sout += 'var obj_' + finalid + ' = {\n';
        sout += '   "id": "' + finalid + '",\n';
        sout += '   "type": "multi",\n';
        sout += '   "opt": [\n';

        var opta = {
            text: "Option A",
            answer: "opta",
            select: true
        };
        var optb = {
            text: "Option B",
            answer: "optb",
            select: false
        };
        var optc = {
            text: "Option C",
            answer: "optc",
            select: false
        };
        var optd = {
            text: "Option D",
            answer: "optd",
            select: false
        };
        var opte = {
            text: "Option E",
            answer: "opte",
            select: false
        };


        opta.text = $('input[name="opttexta"]', $frm).val();
        opta.answer = $('input[name="answera"]', $frm).val();
        opta.select = $('input[name="selecta"]').is(':checked');
        optb.text = $('input[name="opttextb"]', $frm).val();
        optb.answer = $('input[name="answerb"]', $frm).val();
        optb.select = $('input[name="selectb"]').is(':checked');
        optc.text = $('input[name="opttextc"]', $frm).val();
        optc.answer = $('input[name="answerc"]', $frm).val();
        optc.select = $('input[name="selectc"]').is(':checked');
        optd.text = $('input[name="opttextd"]', $frm).val();
        optd.answer = $('input[name="answerd"]', $frm).val();
        optd.select = $('input[name="selectd"]').is(':checked');
        opte.text = $('input[name="opttexte"]', $frm).val();
        opte.answer = $('input[name="answere"]', $frm).val();
        opte.select = $('input[name="selecte"]').is(':checked');

        var xval;
        objMulti1.opt = [];
        xval = $('input[name="opttexta"]', $frm).val();
        if (xval && $.trim(xval)) {
            objMulti1.opt.push(opta);
            sout += '       {\n';
            sout += '           "text": "' + xval + '",\n';
            sout += '           "answer": "' + $('input[name="answera"]', $frm).val() + '",\n';
            sout += '           "select": ' + $('input[name="selecta"]').is(':checked') + ',\n';
            sout += '       },\n';
            var yval = $('input[name="answera"]', $frm).val();
            if (yval && $.trim(yval)) {
                hout += '       <div data-opt="' + yval + '">Answer A<\/div>\n';
            }
        }
        xval = $('input[name="opttextb"]', $frm).val();
        if (xval && $.trim(xval)) {
            objMulti1.opt.push(optb);
            sout += '       {\n';
            sout += '           "text": "' + xval + '",\n';
            sout += '           "answer": "' + $('input[name="answerb"]', $frm).val() + '",\n';
            sout += '           "select": ' + $('input[name="selectb"]').is(':checked') + ',\n';
            sout += '       },\n';
            var yval = $('input[name="answerb"]', $frm).val();
            if (yval && $.trim(yval)) {
                hout += '       <div data-opt="' + yval + '">Answer B<\/div>\n';
            }
        }
        xval = $('input[name="opttextc"]', $frm).val();
        if (xval && $.trim(xval)) {
            objMulti1.opt.push(optc);
            sout += '       {\n';
            sout += '           "text": "' + xval + '",\n';
            sout += '           "answer": "' + $('input[name="answerc"]', $frm).val() + '",\n';
            sout += '           "select": ' + $('input[name="selectc"]').is(':checked') + ',\n';
            sout += '       },\n';
            var yval = $('input[name="answerc"]', $frm).val();
            if (yval && $.trim(yval)) {
                hout += '       <div data-opt="' + yval + '">Answer C<\/div>\n';
            }
        }
        xval = $('input[name="opttextd"]', $frm).val();
        if (xval && $.trim(xval)) {
            objMulti1.opt.push(optd);
            sout += '       {\n';
            sout += '           "text": "' + xval + '",\n';
            sout += '           "answer": "' + $('input[name="answerd"]', $frm).val() + '",\n';
            sout += '           "select": ' + $('input[name="selectd"]').is(':checked') + ',\n';
            sout += '       },\n';
            var yval = $('input[name="answerd"]', $frm).val();
            if (yval && $.trim(yval)) {
                hout += '       <div data-opt="' + yval + '">Answer D<\/div>\n';
            }
        }
        xval = $('input[name="opttexte"]', $frm).val();
        if (xval && $.trim(xval)) {
            objMulti1.opt.push(opte);
            sout += '       {\n';
            sout += '           "text": "' + xval + '",\n';
            sout += '           "answer": "' + $('input[name="answere"]', $frm).val() + '",\n';
            sout += '           "select": ' + $('input[name="selecte"]').is(':checked') + ',\n';
            sout += '       },\n';
            var yval = $('input[name="answere"]', $frm).val();
            if (yval && $.trim(yval)) {
                hout += '       <div data-opt="' + yval + '">Answer E<\/div>\n';
            }
        }

        //quito la ultima coma ,
        sout = sout.slice(0, -2);
        sout += '\n';
        sout += '        ],\n';

        //termino el texto html
        hout += '   </div>\n';
        hout += '</div>\n';

        //fieldset
        if ($('input[name="fieldset"]', $frm).is(":checked")) {
            objMulti1.fieldset = true;
            sout += '   "fieldset": true,\n';
        } else {
            objMulti1.fieldset = false;
            sout += '   "fieldset": false,\n';
        }
        //legend
        objMulti1.legend = $('input[name="legend"]', $frm).val();
        sout += '   "legend": "' + $('input[name="legend"]', $frm).val() + '",\n';
        //nameact
        if ($('input[name="nameact"]', $frm).val()) {
            objMulti1.name = $('input[name="nameact"]', $frm).val();
            sout += '   "name": "' + $('input[name="nameact"]', $frm).val() + '",\n';
        } else {
            objMulti1.name = "";
            //sout += '   "name": "",\n';
        }
        //button
        if ($('input[name="btntext"]', $frm).val()) {
            objMulti1.button = $('input[name="btntext"]', $frm).val();
            sout += '   "button": "' + $('input[name="btntext"]', $frm).val() + '",\n';
        } else {
            objMulti1.button = "";
            //sout += '   "button": "",\n';
        }
        //list
        if ($('select[name="lista"]', $frm).val()) {
            objMulti1.list = $('select[name="lista"]', $frm).val();
            sout += '   "list": "' + $('select[name="lista"]', $frm).val() + '",\n';
        } else {
            objMulti1.list = "";
        }
        //optsuccess
        if ($('input[name="optsuccess"]', $frm).is(":checked")) {
            objMulti1.optsuccess = true;
            sout += '   "optsuccess": true,\n';
        } else {
            objMulti1.optsuccess = false;
            sout += '   "optsuccess": false,\n';
        }
        //hint
        if ($('input[name="hint"]', $frm).is(":checked")) {
            objMulti1.hint = true;
            sout += '   "hint": true,\n';
        } else {
            objMulti1.hint = false;
            sout += '   "hint": false,\n';
        }
        //random
        if ($('input[name="random"]', $frm).is(":checked")) {
            objMulti1.random = true;
            sout += '   "random": true,\n';
        } else {
            objMulti1.random = false;
            sout += '   "random": false,\n';
        }
        //weighting
        objMulti1.weighting = parseInt($('input[name="weighting"]', $frm).val());
        sout += '   "weighting": ' + $('input[name="weighting"]', $frm).val() + ',\n';
        //lighting
        objMulti1.lighting = parseInt($('input[name="lighting"]', $frm).val());
        sout += '   "lighting": ' + $('input[name="lighting"]', $frm).val() + ',\n';
        //icons
        if ($('select[name="icons"]', $frm).val()) {
            objMulti1.icons = $('select[name="icons"]', $frm).val();
            sout += '   "icons": "' + $('select[name="icons"]', $frm).val() + '",\n';
        } else {
            objMulti1.icons = "";
            sout += '   "icons": "",\n';
        }
        //storage
        if ($('select[name="storage"]', $frm).val()) {
            objMulti1.storage = $('select[name="storage"]', $frm).val();
            sout += '   "storage": "' + $('select[name="storage"]', $frm).val() + '",\n';
        } else {
            objMulti1.storage = "";
        }
        //storagekey
        if ($('input[name="storagekey"]', $frm).val()) {
            objMulti1.storagekey = $('input[name="storagekey"]', $frm).val();
            sout += '   "storagekey": "' + $('input[name="storagekey"]', $frm).val() + '",\n';
        } else {
            objMulti1.storagekey = "";
        }
        //showstorage
        if ($('input[name="showstorage"]', $frm).is(":checked")) {
            objMulti1.showstorage = true;
            sout += '   "showstorage": true,\n';
        } else {
            objMulti1.showstorage = false;
            sout += '   "showstorage": false,\n';
        }
        //fillfromstorage
        if ($('input[name="fillfromstorage"]', $frm).is(":checked")) {
            objMulti1.fillfromstorage = true;
            sout += '   "fillfromstorage": true,\n';
        } else {
            objMulti1.fillfromstorage = false;
            sout += '   "fillfromstorage": false,\n';
        }
        //delstorage
        if ($('input[name="delstorage"]', $frm).is(":checked")) {
            objMulti1.delstorage = true;
            sout += '   "delstorage": true,\n';
        } else {
            objMulti1.delstorage = false;
            sout += '   "delstorage": false,\n';
        }
        //onready
        if ($('input[name="onready"]', $frm).is(":checked")) {
            objMulti1.onready = function () { alert("onready"); };
            sout += '   "onready": function () { alert("onready"); },\n';
        } else {
            objMulti1.onready = undefined;
            //sout += '   "onready": undefined,\n';
        }
        //oncheck
        if ($('input[name="oncheck"]', $frm).is(":checked")) {
            objMulti1.oncheck = function () { alert("oncheck\n\nscore: " + this.score); };
            sout += '   "oncheck": function () { alert("oncheck\\n\\nscore: " + this.score); },\n';
        } else {
            objMulti1.oncheck = undefined;
            //sout += '   "oncheck": undefined,\n';
        }
        //onok
        if ($('input[name="onok"]', $frm).is(":checked")) {
            objMulti1.onok = function () { alert("onok"); };
            sout += '   "onok": function () { alert("onok"); },\n';
        } else {
            objMulti1.onok = undefined;
            //sout += '   "onok": undefined,\n';
        }
        //onko
        if ($('input[name="onko"]', $frm).is(":checked")) {
            objMulti1.onko = function () { alert("onko\n\nattempts: " + this.attempts); };
            sout += '   "onko": function () { alert("onko\\n\\nattempts: " + this.attempts); },\n';
        } else {
            objMulti1.onko = undefined;
            //sout += '   "onko": undefined,\n';
        }


        //quito la ultima coma ,
        sout = sout.slice(0, -2);

        sout += '\n};\n';
        sout += 'jsGeork.Questions.Question(obj_' + finalid + ');\n';
        sout += '<\/script>\n';

        $('#bloqueej').html(hout); //modifico el html del ejemplo en funcionamiento
        $("#txtareahtml").text(hout);
        $("#textcode").text(hout + '\n\n' + sout);

        //guardo valores
        saveData();
        storeData();


    } //end setQuestion



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

    //borrar el storage
    $("#delsto").on("click", delData);
    $("#delstokey").on("click", function () {
        delKeySto($('#storagekey').val())
        }
    );
    $("#stokeyname").text(stokey);

    $("#btngenera").on("click", function () {

        setQuestion();
        jsGeork.Questions.Question(objMulti1);
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