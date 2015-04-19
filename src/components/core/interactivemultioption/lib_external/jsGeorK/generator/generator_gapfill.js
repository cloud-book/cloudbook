
jQuery(function ($) {





    //valores por defecto
    var objGapFill1 = {
        id: "myprefix_pgf_identifier",
        "type": "gapfill",
        fieldset: true,
        legend: "Actividad de rellenar huecos",
        //button: "Comprueba",
        gaps: {
            "gap1": {
                "type": "inputgap",
                "nombre": "gap1",
                "solucion": "Mancha",
                "words": [],
                "weight": 100,
                "placeholder": "?",              //(string) atributo placeholder del input
                "showwords": false,
                "casesensitive": false,         //(boolean) si el hueco es sensible a mayúsculas
                "autocomplete": "",             //(string)(on,off) Si hay que poner el atributo autocomplete en el input
                "adjustgaps": "",               //(string)("" o none,all,size,maxlength) 
                "aria-label": "default"
            }
        },
        clase: "",
        attempts: 3,
        "hint": true,
        "btnhint": "",
        "icons": "csshexent",
        "fillfromstorage": true,
        "storage": "local", //local o session
        "storagekey": "jsgeork",
        "delstorage": false,
        weighting: 100,
        lighting: 0
    };
    //jsGeork.Questions.Question(objGapFill1);



    //---------------------------------------------------
    //storage
    var stokey = "geork_gen_gapfill";
    var stodata_def = {
        id: "pgf_identifier",
        "prefix": "myprefix_",
        //fieldset: true,
        //legend: "Pregunta con respuestas en cuadros de entrada",
        button: "",
        gaps: {
            "gap1": {
                "type": "inputgap",
                "nombre": "gap1",
                "solucion": "Mancha",
                "words": [],
                "weight": 100,
                "placeholder": "?",              //(string) atributo placeholder del input
                "showwords": false,
                "casesensitive": false,         //(boolean) si el hueco es sensible a mayúsculas
                "autocomplete": "",             //(string)(on,off) Si hay que poner el atributo autocomplete en el input
                "adjustgaps": "",               //(string)("" o none,all,size,maxlength) 
                "aria-label": "default"
            }
        },
        fieldset: true,
        legend: "Actividad de rellenar huecos",
        hint: true,
        attempts: 3,
        btnhint: "",
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
    var stodata = stodata_def;


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
        stodata = stodata_def;
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

        stodata.gaps.gap1.type = $('select[name="tipoinp"]').val();
        stodata.gaps.gap1.nombre = $('input[name="namegap1"]').val();
        stodata.gaps.gap1.solucion = $('input[name="solgap1"]').val();
        stodata.gaps.gap1.words[0] = $('input[name="valgap1a"]').val();
        stodata.gaps.gap1.words[1] = $('input[name="valgap1b"]').val();
        stodata.gaps.gap1.words[2] = $('input[name="valgap1c"]').val();
        stodata.gaps.gap1.words[3] = $('input[name="valgap1d"]').val();
        stodata.gaps.gap1.weight = $('input[name="weightgap1"]').val();
        stodata.gaps.gap1.placeholder = $('input[name="placeholdergap1"]').val();
        stodata.gaps.gap1.showwords = $('input[name="showwordsgap1"]').is(':checked');
        stodata.gaps.gap1.casesensitive = $('input[name="casesensitivegap1"]').is(':checked');
        stodata.gaps.gap1.autocomplete = $('select[name="autocompletegap1"]').val();
        stodata.gaps.gap1.adjustgaps = $('select[name="adjustgapsgap1"]').val();
        stodata.gaps.gap1["aria-label"] = $('input[name="aria-labelgap1"]').val();
        stodata.attempts = $('input[name="attempts"]').val();
        stodata.fieldset = $('input[name="fieldset"]').is(':checked');
        stodata.legend = $('input[name="legend"]').val();
        stodata.hint = $('input[name="hint"]').is(':checked');
        stodata.btnhint = $('input[name="btnhint"]').val();
        stodata.nameact = $('input[name="nameact"]').val();
        stodata.button = $('input[name="btntext"]').val();
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
        stodata.oncomplete = $('input[name="oncomplete"]').is(':checked');
        stodata.onok = $('input[name="onok"]').is(':checked');
        stodata.onko = $('input[name="onko"]').is(':checked');
    }
    function setData() {
        
        $('input[name="idact"]').val(stodata.id);
        $('input[name="idprefix"]').val(stodata.prefix);
        $('select[name="tipoinp"]').val(stodata.gaps.gap1.type);
        $('input[name="namegap1"]').val(stodata.gaps.gap1.nombre);
        $('input[name="solgap1"]').val(stodata.gaps.gap1.solucion);
        $('input[name="valgap1a"]').val(stodata.gaps.gap1.words[0]);
        $('input[name="valgap1b"]').val(stodata.gaps.gap1.words[1]);
        $('input[name="valgap1c"]').val(stodata.gaps.gap1.words[2]);
        $('input[name="valgap1d"]').val(stodata.gaps.gap1.words[3]);
        $('input[name="weightgap1"]').val(stodata.gaps.gap1.weight);
        $('input[name="placeholdergap1"]').val(stodata.gaps.gap1.placeholder);
        $('input[name="showwordsgap1"]').prop('checked', stodata.gaps.gap1.showwords);
        $('input[name="casesensitivegap1"]').prop('checked', stodata.gaps.gap1.casesensitive);
        $('select[name="autocompletegap1"]').val(stodata.gaps.gap1.autocomplete);
        $('select[name="adjustgapsgap1"]').val(stodata.gaps.gap1.adjustgaps);
        $('input[name="aria-labelgap1"]').val(stodata.gaps.gap1["aria-label"]);
        $('input[name="attempts"]').val(stodata.attempts);
        $('input[name="fieldset"]').prop('checked', stodata.fieldset);
        $('input[name="legend"]').val(stodata.legend);
        $('input[name="hint"]').prop('checked', stodata.hint);
        $('input[name="btnhint"]').val(stodata.btnhint);
        $('input[name="nameact"]').val(stodata.nameact);
        $('input[name="btntext"]').val(stodata.button);
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
        $('input[name="oncomplete"]').prop('checked', stodata.oncomplete);
        $('input[name="onok"]').prop('checked', stodata.onok);
        $('input[name="onko"]').prop('checked', stodata.onko);
        $('input[name="hint"]').trigger("change");
        $('select[name="tipoinp"]').trigger("change");
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

        objGapFill1.id = finalid; // pongo en el objeto de ejemplo el id final


        hout += '<!-- $addjqueryhead$ -->\n';
        hout += '<!-- $addjsgeorkhead$ -->\n';
        hout += '<div id="' + finalid + '">\n';
        hout += '   <div id="' + finalid + '_info_aria" class="CSSInfoTextPgf">Rellene los huecos...</div>\n';
        hout += '   <p data-makeqs="' + finalid + '">En un lugar de la ';
        if ($('select[name="tipoinp"]').val() === 'inputgap') {
            hout += '<span data-gap-fill="' + $('input[name="namegap1"]', $frm).val() + '">' + $('input[name="solgap1"]', $frm).val() + '</span>';
        }
        if ($('select[name="tipoinp"]').val() === 'listgap') {
            hout += '<span data-gap-select="' + $('input[name="namegap1"]', $frm).val() + '">' + $('input[name="solgap1"]', $frm).val() + '</span>';
        }
        hout += ', de cuyo nombre no quiero acordarme,...</p>\n';
        hout += '   <p>...y pulse en el botón para comprobar las respuestas.</p>\n';
        hout += '   <div style="display: none;" aria-hidden="true">\n';
        //hout += '       <div data-info-bottom="' + finalid + '">\n';
        //hout += '           <!-- el interior de este bloque se moverá detrás de los controles de la actividad -->\n';
        //hout += '           Actividad X\n';
        //hout += '       </div>\n';
        hout += '       <div data-info-ok="' + finalid + '">\n';
        hout += '           <!-- El interior de este bloque se mostrará cuando se resuelva bien la actividad -->\n';
        hout += '           <span class="CSSMsgSuccess">¡CORRECTO!</span>\n';
        hout += '       </div>\n';
        hout += '       <div data-info-ko="' + finalid + '">\n';
        hout += '           <!-- El interior de este bloque se mostrará cuando se resuelva mal la actividad -->\n';
        hout += '           <span class="CSSMsgFail">¡ERROR!</span>\n';
        hout += '       </div>\n';
        hout += '   </div>\n';
        hout += '</div>\n';


        sout += '<script>\n';
        sout += 'var obj_' + finalid + ' = {\n';
        sout += '   "id": "' + finalid + '",\n';
        sout += '   "type": "gapfill",\n';
        sout += '   "gaps": {\n';

        var gapa = {
            "type": "inputgap", //inputgap o listgap para guardar tipoinp
            "nombre": "gap1",
            "solucion": "",
            "words": [],
            "weight": 100,
            "placeholder": "?",              //(string) atributo placeholder del input
            "showwords": false,
            "casesensitive": false,         //(boolean) si el hueco es sensible a mayúsculas
            "autocomplete": "",             //(string)(on,off) Si hay que poner el atributo autocomplete en el input
            "adjustgaps": "",               //(string)("" o none,all,size,maxlength) 
            "aria-label":"default"
        };


        gapa.type = $('select[name="tipoinp"]').val();
        gapa.nombre = $('input[name="namegap1"]').val();
        gapa.solucion = $('input[name="solgap1"]').val();
        if ($('input[name="valgap1a"]').val()) {
            gapa.words.push('' + $('input[name="valgap1a"]').val() + '');
        }
        if ($('input[name="valgap1b"]').val()) {
            gapa.words.push('' + $('input[name="valgap1b"]').val() + '');
        }
        if ($('input[name="valgap1c"]').val()) {
            gapa.words.push('' + $('input[name="valgap1c"]').val() + '');
        }
        if ($('input[name="valgap1d"]').val()) {
            gapa.words.push('' + $('input[name="valgap1d"]').val() + '');
        }
        gapa.weight = parseInt($('input[name="weightgap1"]').val());
        gapa.placeholder = $('input[name="placeholdergap1"]').val();
        gapa.showwords = $('input[name="showwordsgap1"]').is(':checked');
        gapa.casesensitive = $('input[name="casesensitivegap1"]').is(':checked');
        gapa.autocomplete = $('select[name="autocompletegap1"]').val();
        gapa.adjustgaps = $('select[name="adjustgapsgap1"]').val();
        gapa["aria-label"] = $('input[name="aria-labelgap1"]').val();

        objGapFill1.gaps.gap1 = gapa;
        //console.log(objGapFill1);




        if (gapa.nombre && $.trim(gapa.nombre)) {
            objGapFill1.gaps.gap1 = $.extend({}, gapa);
            sout += '        "' + gapa.nombre + '": {\n';
            //sout += '           "type": "' + objInput1.boxs.box1.type + '",\n';
            sout += '           "words": [';
            var badded = false;
            if (gapa.words[0]) {
                sout += "'" + gapa.words[0] + "',";
                badded = true;
            }
            if (gapa.words[1]) {
                sout += "'" + gapa.words[1] + "',";
                badded = true;
            }
            if (gapa.words[2]) {
                sout += "'" + gapa.words[2] + "',";
                badded = true;
            }
            if (gapa.words[3]) {
                sout += "'" + gapa.words[3] + "',";
                badded = true;
            }
            if (badded) {
                //quito la ultima coma ,
                sout = sout.slice(0, -1);
            }
            sout += '],\n';
            if (objGapFill1.gaps.gap1.type === 'inputgap') {
                sout += '           "showwords": ' + objGapFill1.gaps.gap1.showwords + ',\n';
                sout += '           "casesensitive": ' + objGapFill1.gaps.gap1.casesensitive + ',\n';
                sout += '           "placeholder": "' + objGapFill1.gaps.gap1.placeholder + '",\n';
                sout += '           "autocomplete": "' + objGapFill1.gaps.gap1.autocomplete + '",\n';
                sout += '           "adjustgaps": "' + objGapFill1.gaps.gap1.adjustgaps + '",\n';
                if (objGapFill1.gaps.gap1["aria-label"]) {
                    sout += '           "aria-label": "' + objGapFill1.gaps.gap1["aria-label"] + '",\n';
                }
            }
            sout += '           "weight": ' + objGapFill1.gaps.gap1.weight + '\n';
            sout += '       },\n';
        }

        //quito la ultima coma ,
        sout = sout.slice(0, -2);
        sout += '\n';
        sout += '     },\n';

        //attempts
        objGapFill1.attempts = parseInt($('input[name="attempts"]', $frm).val());
        sout += '   "attempts": ' + $('input[name="attempts"]', $frm).val() + ',\n';
        //fieldset
        if ($('input[name="fieldset"]', $frm).is(":checked")) {
            objGapFill1.fieldset = true;
            sout += '   "fieldset": true,\n';
        } else {
            objGapFill1.fieldset = false;
            sout += '   "fieldset": false,\n';
        }
        //legend
        objGapFill1.legend = $('input[name="legend"]', $frm).val();
        sout += '   "legend": "' + $('input[name="legend"]', $frm).val() + '",\n';
        //nameact
        if ($('input[name="nameact"]', $frm).val()) {
            objGapFill1.name = $('input[name="nameact"]', $frm).val();
            sout += '   "name": "' + $('input[name="nameact"]', $frm).val() + '",\n';
        } else {
            objGapFill1.name = "";
            //sout += '   "name": "",\n';
        }
        //button
        if ($('input[name="btntext"]', $frm).val()) {
            objGapFill1.button = $('input[name="btntext"]', $frm).val();
            sout += '   "button": "' + $('input[name="btntext"]', $frm).val() + '",\n';
        } else {
            objGapFill1.button = "";
            sout += '   "button": "",\n';
        }
        //hint
        if ($('input[name="hint"]', $frm).is(":checked")) {
            objGapFill1.hint = true;
            sout += '   "hint": true,\n';
        } else {
            objGapFill1.hint = false;
            sout += '   "hint": false,\n';
        }
        //btnhint
        objGapFill1.btnhint = $('input[name="btnhint"]', $frm).val();
        sout += '   "btnhint": "' + $('input[name="btnhint"]', $frm).val() + '",\n';
        //weighting
        objGapFill1.weighting = parseInt($('input[name="weighting"]', $frm).val());
        sout += '   "weighting": ' + $('input[name="weighting"]', $frm).val() + ',\n';
        //lighting
        objGapFill1.lighting = parseInt($('input[name="lighting"]', $frm).val());
        sout += '   "lighting": ' + $('input[name="lighting"]', $frm).val() + ',\n';
        //icons
        if ($('select[name="icons"]', $frm).val()) {
            objGapFill1.icons = $('select[name="icons"]', $frm).val();
            sout += '   "icons": "' + $('select[name="icons"]', $frm).val() + '",\n';
        } else {
            objGapFill1.icons = "";
            sout += '   "icons": "",\n';
        }
        //storage
        if ($('select[name="storage"]', $frm).val()) {
            objGapFill1.storage = $('select[name="storage"]', $frm).val();
            sout += '   "storage": "' + $('select[name="storage"]', $frm).val() + '",\n';
        } else {
            objGapFill1.storage = "";
        }
        //storagekey
        if ($('input[name="storagekey"]', $frm).val()) {
            objGapFill1.storagekey = $('input[name="storagekey"]', $frm).val();
            sout += '   "storagekey": "' + $('input[name="storagekey"]', $frm).val() + '",\n';
        } else {
            objGapFill1.storagekey = "";
        }
        //showstorage
        if ($('input[name="showstorage"]', $frm).is(":checked")) {
            objGapFill1.showstorage = true;
            sout += '   "showstorage": true,\n';
        } else {
            objGapFill1.showstorage = false;
            sout += '   "showstorage": false,\n';
        }
        //fillfromstorage
        if ($('input[name="fillfromstorage"]', $frm).is(":checked")) {
            objGapFill1.fillfromstorage = true;
            sout += '   "fillfromstorage": true,\n';
        } else {
            objGapFill1.fillfromstorage = false;
            sout += '   "fillfromstorage": false,\n';
        }
        //delstorage
        if ($('input[name="delstorage"]', $frm).is(":checked")) {
            objGapFill1.delstorage = true;
            sout += '   "delstorage": true,\n';
        } else {
            objGapFill1.delstorage = false;
            sout += '   "delstorage": false,\n';
        }
        //onready
        if ($('input[name="onready"]', $frm).is(":checked")) {
            objGapFill1.onready = function () { alert("onready"); };
            sout += '   "onready": function () { alert("onready"); },\n';
        } else {
            objGapFill1.onready = undefined;
            //sout += '   "onready": undefined,\n';
        }
        //oncheck
        if ($('input[name="oncheck"]', $frm).is(":checked")) {
            objGapFill1.oncheck = function () { alert("oncheck\n\nscore: " + this.score); };
            sout += '   "oncheck": function () { alert("oncheck\\n\\nscore: " + this.score); },\n';
        } else {
            objGapFill1.oncheck = undefined;
            //sout += '   "oncheck": undefined,\n';
        }
        //oncomplete
        if ($('input[name="oncomplete"]', $frm).is(":checked")) {
            objGapFill1.oncomplete = function () { alert("oncomplete\n\nattempts: " + this.attempts); };
            sout += '   "oncomplete": function () { alert("oncomplete\\n\\nattempts: " + this.attempts); },\n';
        } else {
            objGapFill1.oncomplete = undefined;
            //sout += '   "oncomplete": undefined,\n';
        }
        //onok
        if ($('input[name="onok"]', $frm).is(":checked")) {
            objGapFill1.onok = function () { alert("onok"); };
            sout += '   "onok": function () { alert("onok"); },\n';
        } else {
            objGapFill1.onok = undefined;
            //sout += '   "onok": undefined,\n';
        }
        //onko
        if ($('input[name="onko"]', $frm).is(":checked")) {
            objGapFill1.onko = function () { alert("onko\n\nattempts: " + this.attempts); };
            sout += '   "onko": function () { alert("onko\\n\\nattempts: " + this.attempts); },\n';
        } else {
            objGapFill1.onko = undefined;
            //sout += '   "onko": undefined,\n';
        }


        //quito la ultima coma ,
        sout = sout.slice(0, -2);

        sout += '\n};\n';
        sout += 'jsGeork.Questions.Question(obj_' + finalid + ');\n';
        sout += '<\/script>\n';

        $('#bloqueej').html(hout); //modifico el html del ejemplo en funcionamiento
        $("#txtareahtml").text(hout); //pongo el html para que se vea
        $("#textcode").text(hout + '\n\n' + sout); //pongo el html en el código



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
    $('input[name="hint"]', $frm).change(function () {
        if ($('input[name="hint"]', $frm).is(":checked")) {
            $('input[name="btnhint"]', $frm).show();
            $('label[for="btnhint"]', $frm).show();
        } else {
            $('input[name="btnhint"]', $frm).hide();
            $('label[for="btnhint"]', $frm).hide();
        }
    });

    $('select[name="tipoinp"]', $frm).change(function () {
        if ($('select[name="tipoinp"]').val() === 'inputgap') {
            $('.ctrlnumgap1', $frm).hide();
            $('.ctrltxtgap1', $frm).show();
        } else {
            $('.ctrlnumgap1', $frm).show();
            $('.ctrltxtgap1', $frm).hide();
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
        jsGeork.Questions.Question(objGapFill1);
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