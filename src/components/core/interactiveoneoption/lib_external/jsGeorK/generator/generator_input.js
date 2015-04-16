
        jQuery(function ($) {





            //valores por defecto
            var objInput1 = {
                id: "myprefix_pib_identifier",
                "type": "input",
                fieldset: true,
                legend: "Pregunta con respuestas en cuadros de entrada",
                //button: "Comprueba",
                boxs: {
                    "box1": {
                        "type": "text",
                        "nombre": "box1",
                        "solucion": "myvalue",
                        "decimals": undefined,
                        "tofixed": undefined,
                        "min": undefined,
                        "max": undefined,
                        "accuracy": undefined,
                        "values": [],
                        "weight": 100,
                        "placeholder": "?",              //(string) atributo placeholder del input
                        "casesensitive": false,         //(boolean) si el hueco es sensible a mayúsculas
                        "autocomplete": "",             //(string)(on,off) Si hay que poner el atributo autocomplete en el input
                        "adjustgaps": "",               //(string)("" o none,all,size,maxlength) 
                        "aria-label": "default"
                    }
                },
                clase: "",
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
            //jsGeork.Questions.Question(objInput1);



            //---------------------------------------------------
            //storage
            var stokey = "geork_gen_input";
            var stodata_def = {
                id: "pib_identifier",
                "prefix": "myprefix_",
                fieldset: true,
                legend: "Pregunta con respuestas en cuadros de entrada",
                button: "",
                boxs: {
                    "box1": {
                        "type": "text", //texto o numero para guardar tipoinp
                        "nombre": "box1",
                        "solucion": "myvalue",
                        "values": [],
                        "decimals": undefined,
                        "tofixed": undefined,
                        "min": undefined,
                        "max": undefined,
                        "accuracy": undefined,
                        "weight": 100,
                        "placeholder": "?",              //(string) atributo placeholder del input
                        "casesensitive": false,         //(boolean) si el hueco es sensible a mayúsculas
                        "autocomplete": "",             //(string)(on,off) Si hay que poner el atributo autocomplete en el input
                        "adjustgaps": "",               //(string)("" o none,all,size,maxlength) 
                        "aria-label": "default"
                    }
                },
                hint: true,
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

                stodata.boxs.box1.type = $('select[name="tipoinp"]').val();
                stodata.boxs.box1.nombre = $('input[name="namebox1"]').val();
                stodata.boxs.box1.solucion = $('input[name="solbox1"]').val();
                stodata.boxs.box1.values[0] = $('input[name="valbox1a"]').val();
                stodata.boxs.box1.values[1] = $('input[name="valbox1b"]').val();
                stodata.boxs.box1.values[2] = $('input[name="valbox1c"]').val();
                stodata.boxs.box1.values[3] = $('input[name="valbox1d"]').val();
                stodata.boxs.box1.decimals = $('input[name="decimalsbox1"]').val();
                stodata.boxs.box1.tofixed = $('input[name="tofixedbox1"]').val();
                stodata.boxs.box1.min = $('input[name="minbox1"]').val();
                stodata.boxs.box1.max = $('input[name="maxbox1"]').val();
                stodata.boxs.box1.accuracy = $('input[name="accuracybox1"]').val();
                stodata.boxs.box1.weight = $('input[name="weightbox1"]').val();
                stodata.boxs.box1.placeholder = $('input[name="placeholderbox1"]').val();
                stodata.boxs.box1.casesensitive = $('input[name="casesensitivebox1"]').is(':checked'); 
                stodata.boxs.box1.autocomplete = $('select[name="autocompletebox1"]').val();
                stodata.boxs.box1.adjustgaps = $('select[name="adjustgapsbox1"]').val();
                stodata.boxs.box1["aria-label"] = $('input[name="aria-labelbox1"]').val();
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
                stodata.attempts = $('input[name="attempts"]').val();
                stodata.oncomplete = $('input[name="oncomplete"]').is(':checked');
                stodata.onok = $('input[name="onok"]').is(':checked');
                stodata.onko = $('input[name="onko"]').is(':checked');
            }
            function setData() {

                $('input[name="idact"]').val(stodata.id);
                $('input[name="idprefix"]').val(stodata.prefix);

                $('select[name="tipoinp"]').val(stodata.boxs.box1.type);
                $('input[name="namebox1"]').val(stodata.boxs.box1.nombre);
                $('input[name="solbox1"]').val(stodata.boxs.box1.solucion);
                $('input[name="valbox1a"]').val(stodata.boxs.box1.values[0]);
                $('input[name="valbox1b"]').val(stodata.boxs.box1.values[1]);
                $('input[name="valbox1c"]').val(stodata.boxs.box1.values[2]);
                $('input[name="valbox1d"]').val(stodata.boxs.box1.values[3]);
                $('input[name="decimalsbox1"]').val(stodata.boxs.box1.decimals);
                $('input[name="tofixedbox1"]').val(stodata.boxs.box1.tofixed);
                $('input[name="minbox1"]').val(stodata.boxs.box1.min);
                $('input[name="maxbox1"]').val(stodata.boxs.box1.max);
                $('input[name="accuracybox1"]').val(stodata.boxs.box1.accuracy);
                $('input[name="weightbox1"]').val(stodata.boxs.box1.weight);
                $('input[name="placeholderbox1"]').val(stodata.boxs.box1.placeholder);
                $('input[name="casesensitivebox1"]').prop('checked', stodata.boxs.box1.casesensitive);
                $('select[name="autocompletebox1"]').val(stodata.boxs.box1.autocomplete);
                $('select[name="adjustgapsbox1"]').val(stodata.boxs.box1.adjustgaps);
                $('input[name="aria-labelbox1"]').val(stodata.boxs.box1["aria-label"]);
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
                $('input[name="attempts"]').val(stodata.attempts);
                $('input[name="oncomplete"]').prop('checked', stodata.oncomplete);
                $('input[name="onok"]').prop('checked', stodata.onok);
                $('input[name="onko"]').prop('checked', stodata.onko);
                $('input[name="hint"]').trigger("change");
                $('select[name="tipoinp"]').trigger("change");
                $('input[name="fieldset"]').trigger("change");
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

                


                objInput1.id = finalid; // pongo en el objeto de ejemplo el id final




                hout += '<!-- $addjqueryhead$ -->\n';
                hout += '<!-- $addjsgeorkhead$ -->\n';
                if ($('input[name="fieldset"]', $frm).is(":checked")) {
                    hout += '<div id="' + finalid + '">\n';
                    hout += '   <div id="' + finalid + '_info_aria" class="CSSInfoTextPip">Rellene los cuadros...</div>\n';
                }
                hout += '<span data-makeqs="' + finalid + '">\n';
                hout += '   Solución: <span data-input-make="' + $('input[name="namebox1"]', $frm).val() + '">' + $('input[name="solbox1"]', $frm).val() + '</span>\n';
                hout += '</span>\n';
                hout += '<!-- botones -->\n';
                hout += '<span data-input-btnchek="' + finalid + '"></span><span data-input-btnhint="' + finalid + '"></span>\n';
                hout += '<div data-info-hint="' + finalid + '" style="display: none;" aria-hidden="true">\n';
                hout += '   Contenido a mostrar cuando se pulsa en el botón de ayuda\n';
                hout += '</div>\n';
                hout += '<div data-input-showinfo="' + finalid + '">\n';
                hout += '   <!-- muestra información sobre los intentos y aciertos -->\n';
                hout += '</div>\n';
                hout += '<div data-info-ok="' + finalid + '" style="display: none;" aria-hidden="true">\n';
                hout += '   <!-- El interior de este bloque se colocará detrás del botón cuando se resuelva bien -->\n';
                hout += '   <span class="CSSMsgSuccess">¡CORRECTO!</span>\n';
                hout += '</div>\n';
                hout += '<div data-info-ko="' + finalid + '" style="display: none;" aria-hidden="true">\n';
                hout += '   <!-- El interior de este bloque se colocará detrás del botón cuando se resuelva mal -->\n';
                hout += '   <span class="CSSMsgFail">¡ERROR!</span>\n';
                hout += '</div>\n';
                hout += '<div data-stored-results="' + finalid + '">\n';
                hout += '   <!-- mostrará los resultados previos -->\n';
                hout += '</div>\n';
                if ($('input[name="fieldset"]', $frm).is(":checked")) {
                    hout += '</div> <!-- end div id=' + finalid + ' -->\n';
                }

                sout += '<script>\n';
                sout += 'var obj_' + finalid + ' = {\n';
                sout += '   "id": "' + finalid + '",\n';
                sout += '   "type": "input",\n';
                sout += '   "boxs": {\n';

                var boxa = {
                    "type": "text", //texto o numero para guardar tipoinp
                    "nombre": "box1",
                    "solucion": "",
                    "values": [],
                    "decimals": undefined,
                    "tofixed": undefined,
                    "min": undefined,
                    "max": undefined,
                    "accuracy": undefined,
                    "weight": 100,
                    "placeholder": "?",              //(string) atributo placeholder del input
                    "casesensitive": false,         //(boolean) si el hueco es sensible a mayúsculas
                    "autocomplete": "",             //(string)(on,off) Si hay que poner el atributo autocomplete en el input
                    "adjustgaps": "",               //(string)("" o none,all,size,maxlength) 
                    "aria-label": "default"
                };


                boxa.type = $('select[name="tipoinp"]').val();
                boxa.nombre = $('input[name="namebox1"]').val();
                boxa.solucion = $('input[name="solbox1"]').val();
                if (objInput1.boxs.box1.type === 'text') {
                    if ($('input[name="valbox1a"]').val()) {
                        boxa.values.push('' + $('input[name="valbox1a"]').val() + '');
                    }
                    if ($('input[name="valbox1b"]').val()) {
                        boxa.values.push('' + $('input[name="valbox1b"]').val() + '');
                    }
                    if ($('input[name="valbox1c"]').val()) {
                        boxa.values.push('' + $('input[name="valbox1c"]').val() + '');
                    }
                    if ($('input[name="valbox1d"]').val()) {
                        boxa.values.push('' + $('input[name="valbox1d"]').val() + '');
                    }
                } else {
                    if ($('input[name="valbox1a"]').val() && $.isNumeric(parseFloat($('input[name="valbox1a"]').val()))) {
                        boxa.values.push( parseFloat($('input[name="valbox1a"]').val()));
                    }
                    if ($('input[name="valbox1b"]').val() && $.isNumeric(parseFloat($('input[name="valbox1b"]').val()))) {
                        boxa.values.push( parseFloat($('input[name="valbox1b"]').val()));
                    }
                    if ($('input[name="valbox1c"]').val() && $.isNumeric(parseFloat($('input[name="valbox1c"]').val()))) {
                        boxa.values.push( parseFloat($('input[name="valbox1c"]').val()));
                    }
                    if ($('input[name="valbox1d"]').val() && $.isNumeric(parseFloat($('input[name="valbox1d"]').val()))) {
                        boxa.values.push( parseFloat($('input[name="valbox1d"]').val()));
                    }
                }
                boxa.decimals = parseInt($('input[name="decimalsbox1"]').val());
                boxa.tofixed = parseInt($('input[name="tofixedbox1"]').val());
                boxa.min = parseInt($('input[name="minbox1"]').val());
                boxa.max = parseInt($('input[name="maxbox1"]').val());
                boxa.accuracy = parseInt($('input[name="accuracybox1"]').val());
                boxa.weight = parseInt($('input[name="weightbox1"]').val());
                boxa.placeholder = $('input[name="placeholderbox1"]').val();
                boxa.casesensitive = $('input[name="casesensitivebox1"]').is(':checked');
                boxa.autocomplete = $('select[name="autocompletebox1"]').val();
                boxa.adjustgaps = $('select[name="adjustgapsbox1"]').val();
                boxa["aria-label"] = $('input[name="aria-labelbox1"]').val();

                objInput1.boxs.box1 = boxa;
                console.log(objInput1);

                if (boxa.nombre && $.trim(boxa.nombre)) {
                    objInput1.boxs.box1 = $.extend({}, boxa);
                    sout += '        "' + boxa.nombre + '": {\n';
                    sout += '           "type": "' + objInput1.boxs.box1.type + '",\n';
                    sout += '           "values": [';
                    var badded = false;
                    if (boxa.values[0]) {
                        if (objInput1.boxs.box1.type === 'number') {
                            if ($.isNumeric(boxa.values[0])) {
                                sout += boxa.values[0] + ',';
                                badded = true;
                            }
                        } else {
                            sout += "'" + boxa.values[0] + "',";
                            badded = true;
                        }
                    }
                    if (boxa.values[1]) {
                        if (objInput1.boxs.box1.type === 'number') {
                            if ($.isNumeric(boxa.values[1])) {
                                sout += boxa.values[1] + ',';
                                badded = true;
                            }
                        } else {
                            sout += "'" + boxa.values[1] + "',";
                            badded = true;
                        }
                    }
                    if (boxa.values[2]) {
                        if (objInput1.boxs.box1.type === 'number') {
                            if ($.isNumeric(boxa.values[2])) {
                                sout += boxa.values[2] + ',';
                                badded = true;
                            }
                        } else {
                            sout += "'" + boxa.values[2] + "',";
                            badded = true;
                        }
                    }
                    if (boxa.values[3]) {
                        if (objInput1.boxs.box1.type === 'number') {
                            if ($.isNumeric(boxa.values[3])) {
                                sout += boxa.values[3] + ',';
                                badded = true;
                            }
                        } else {
                            sout += "'" + boxa.values[3] + "',";
                            badded = true;
                        }
                    }
                    if (badded) {
                        //quito la ultima coma ,
                        sout = sout.slice(0, -1);
                    }
                    sout += '],\n';
                    if (objInput1.boxs.box1.type === 'text') {
                        sout += '           "casesensitive": ' + objInput1.boxs.box1.casesensitive + ',\n';
                    } else {
                        if ($.isNumeric(objInput1.boxs.box1.min) && $.isNumeric(objInput1.boxs.box1.max) && (objInput1.boxs.box1.min < objInput1.boxs.box1.max)) {
                        if (objInput1.boxs.box1.min) { sout += '           "min": ' + objInput1.boxs.box1.min + ',\n'; }
                        if (objInput1.boxs.box1.max) { sout += '           "max": ' + objInput1.boxs.box1.max + ',\n'; }
                    }
                        if (objInput1.boxs.box1.decimals) { sout += '           "decimals": ' + objInput1.boxs.box1.decimals + ',\n'; }
                        if (objInput1.boxs.box1.tofixed) { sout += '           "tofixed": ' + objInput1.boxs.box1.tofixed + ',\n'; }
                        if (objInput1.boxs.box1.accuracy) { sout += '           "accuracy": ' + objInput1.boxs.box1.accuracy + ',\n';}
                    }
                    sout += '           "weight": ' + objInput1.boxs.box1.weight + ',\n';
                    sout += '           "placeholder": "' + objInput1.boxs.box1.placeholder + '",\n';  
                    sout += '           "autocomplete": "' + objInput1.boxs.box1.autocomplete + '",\n';
                    sout += '           "adjustgaps": "' + objInput1.boxs.box1.adjustgaps + '",\n';
                    if (objInput1.boxs.box1["aria-label"]) {
                        sout += '           "aria-label": "' + objInput1.boxs.box1["aria-label"] + '",\n';
                    }
                    sout = sout.slice(0, -2);
                    sout += '\n';
                    sout += '       },\n';
                }

                //quito la ultima coma ,
                sout = sout.slice(0, -2);
                sout += '\n';
                sout += '     },\n';


                //fieldset
                if ($('input[name="fieldset"]', $frm).is(":checked")) {
                    objInput1.fieldset = true;
                    sout += '   "fieldset": true,\n';
                } else {
                    objInput1.fieldset = false;
                    sout += '   "fieldset": false,\n';
                }
                //legend
                objInput1.legend = $('input[name="legend"]', $frm).val();
                sout += '   "legend": "' + $('input[name="legend"]', $frm).val() + '",\n';
                //nameact
                if ($('input[name="nameact"]', $frm).val()) {
                    objInput1.name = $('input[name="nameact"]', $frm).val();
                    sout += '   "name": "' + $('input[name="nameact"]', $frm).val() + '",\n';
                } else {
                    objInput1.name = "";
                    //sout += '   "name": "",\n';
                }
                //button
                if ($('input[name="btntext"]', $frm).val()) {
                    objInput1.button = $('input[name="btntext"]', $frm).val();
                    sout += '   "button": "' + $('input[name="btntext"]', $frm).val() + '",\n';
                } else {
                    objInput1.button = "";
                    //sout += '   "button": "",\n';
                }
                //hint
                if ($('input[name="hint"]', $frm).is(":checked")) {
                    objInput1.hint = true;
                    sout += '   "hint": true,\n';
                } else {
                    objInput1.hint = false;
                    sout += '   "hint": false,\n';
                }
                //btnhint
                objInput1.btnhint = $('input[name="btnhint"]', $frm).val();
                sout += '   "btnhint": "' + $('input[name="btnhint"]', $frm).val() + '",\n';
                //weighting
                objInput1.weighting = parseInt($('input[name="weighting"]', $frm).val());
                sout += '   "weighting": ' + $('input[name="weighting"]', $frm).val() + ',\n';
                //lighting
                objInput1.lighting = parseInt($('input[name="lighting"]', $frm).val());
                sout += '   "lighting": ' + $('input[name="lighting"]', $frm).val() + ',\n';
                //icons
                if ($('select[name="icons"]', $frm).val()) {
                    objInput1.icons = $('select[name="icons"]', $frm).val();
                    sout += '   "icons": "' + $('select[name="icons"]', $frm).val() + '",\n';
                } else {
                    objInput1.icons = "";
                    sout += '   "icons": "",\n';
                }
                //storage
                if ($('select[name="storage"]', $frm).val()) {
                    objInput1.storage = $('select[name="storage"]', $frm).val();
                    sout += '   "storage": "' + $('select[name="storage"]', $frm).val() + '",\n';
                } else {
                    objInput1.storage = "";
                }
                //storagekey
                if ($('input[name="storagekey"]', $frm).val()) {
                    objInput1.storagekey = $('input[name="storagekey"]', $frm).val();
                    sout += '   "storagekey": "' + $('input[name="storagekey"]', $frm).val() + '",\n';
                } else {
                    objInput1.storagekey = "";
                }
                //showstorage
                if ($('input[name="showstorage"]', $frm).is(":checked")) {
                    objInput1.showstorage = true;
                    sout += '   "showstorage": true,\n';
                } else {
                    objInput1.showstorage = false;
                    sout += '   "showstorage": false,\n';
                }
                //fillfromstorage
                if ($('input[name="fillfromstorage"]', $frm).is(":checked")) {
                    objInput1.fillfromstorage = true;
                    sout += '   "fillfromstorage": true,\n';
                } else {
                    objInput1.fillfromstorage = false;
                    sout += '   "fillfromstorage": false,\n';
                }
                //delstorage
                if ($('input[name="delstorage"]', $frm).is(":checked")) {
                    objInput1.delstorage = true;
                    sout += '   "delstorage": true,\n';
                } else {
                    objInput1.delstorage = false;
                    sout += '   "delstorage": false,\n';
                }
                //onready
                if ($('input[name="onready"]', $frm).is(":checked")) {
                    objInput1.onready = function () { alert("onready"); };
                    sout += '   "onready": function () { alert("onready"); },\n';
                } else {
                    objInput1.onready = undefined;
                    //sout += '   "onready": undefined,\n';
                }
                //oncheck
                if ($('input[name="oncheck"]', $frm).is(":checked")) {
                    objInput1.oncheck = function () { alert("oncheck\n\nscore: " + this.score); };
                    sout += '   "oncheck": function () { alert("oncheck\\n\\nscore: " + this.score); },\n';
                } else {
                    objInput1.oncheck = undefined;
                    //sout += '   "oncheck": undefined,\n';
                }
                //attempts
                if ($('input[name="attempts"]', $frm).val()) {
                    objInput1.attempts = $('input[name="attempts"]', $frm).val();
                    sout += '   "attempts": ' + $('input[name="attempts"]', $frm).val() + ',\n';
                }
                //oncomplete
                if ($('input[name="oncomplete"]', $frm).is(":checked")) {
                    objInput1.oncomplete = function () { alert("oncomplete\n\nattempts: " + this.attempts); };
                    sout += '   "oncomplete": function () { alert("oncomplete\\n\\nattempts: " + this.attempts); },\n';
                } else {
                    objInput1.oncomplete = undefined;
                    //sout += '   "oncomplete": undefined,\n';
                }
                //onok
                if ($('input[name="onok"]', $frm).is(":checked")) {
                    objInput1.onok = function () { alert("onok"); };
                    sout += '   "onok": function () { alert("onok"); },\n';
                } else {
                    objInput1.onok = undefined;
                    //sout += '   "onok": undefined,\n';
                }
                //onko
                if ($('input[name="onko"]', $frm).is(":checked")) {
                    objInput1.onko = function () { alert("onko\n\nattempts: " + this.attempts); };
                    sout += '   "onko": function () { alert("onko\\n\\nattempts: " + this.attempts); },\n';
                } else {
                    objInput1.onko = undefined;
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
                if ($('select[name="tipoinp"]').val()==='text') {
                    $('.ctrlnumbox1', $frm).hide();
                    $('.ctrltxtbox1', $frm).show();
                } else {
                    $('.ctrlnumbox1', $frm).show();
                    $('.ctrltxtbox1', $frm).hide();
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
                jsGeork.Questions.Question(objInput1);
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