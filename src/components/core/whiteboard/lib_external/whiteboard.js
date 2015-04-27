(function(win) {
    function WhiteBoardHelper(whiteboard) {
        this.canvas = new fabric.Canvas(whiteboard);
    }
    WhiteBoardHelper.prototype.textInput = function textInput(that) {
        that.canvas.isDrawingMode = false;
        if (that.canvas.getContext) {
            var context = that.canvas.getContext('2d');
        }
        var text, size, color;
        var mouse_pos = {
            x: 0,
            y: 0
        };
        text = $('#text').val();
        size = $('#size').val();
        color = $('#color').val();
        that.canvas.observe('mouse:down', function(e) {
            mouse_pos = that.canvas.getPointer(e.e);
            size = parseInt(size, 10);
            that.canvas.add(new fabric.Text(text, {
                fontFamily: 'Arial',
                fontSize: size,
                left: mouse_pos.x,
                top: mouse_pos.y,
                textAlign: "left",
                fontWeight: 'bold'
            }));
            that.canvas.off('mouse:down');
            that.canvas.renderAll();
            that.canvas.calcOffset();
        });
    };
    WhiteBoardHelper.prototype.draw = function(that) {
        that.canvas.isDrawingMode = true;
        that.canvas.freeDrawingLineWidth = 5;
        that.canvas.renderAll();
        that.canvas.calcOffset();
    };
    WhiteBoardHelper.prototype.rect = function(that) {
        var mouse_pos = {
            x: 0,
            y: 0
        };
        that.canvas.isDrawingMode = false;
        that.canvas.observe('mouse:down', function(e) {
            mouse_pos = that.canvas.getPointer(e.e);
            that.canvas.add(new fabric.Rect({
                left: mouse_pos.x,
                top: mouse_pos.y,
                width: 75,
                height: 50,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 3,
                padding: 10
            }));
            that.canvas.off('mouse:down');
        });
    };
    WhiteBoardHelper.prototype.circle = function(that) {
        var mouse_pos = {
            x: 0,
            y: 0
        };
        that.canvas.isDrawingMode = false;
        that.canvas.observe('mouse:down', function(e) {
            mouse_pos = that.canvas.getPointer(e.e);
            that.canvas.add(new fabric.Circle({
                left: mouse_pos.x,
                top: mouse_pos.y,
                radius: 30,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 3
            }));
            that.canvas.off('mouse:down');
        });
    };
    WhiteBoardHelper.prototype.ellipse = function(that) {
        var mouse_pos = {
            x: 0,
            y: 0
        };
        that.canvas.isDrawingMode = false;
        that.canvas.observe('mouse:down', function(e) {
            mouse_pos = that.canvas.getPointer(e.e);
            that.canvas.add(new fabric.Ellipse({
                rx: 45,
                ry: 25,
                fill: 'white',
                stroke: 'black',
                strokeWidth: 8,
                left: mouse_pos.x,
                top: mouse_pos.y
            }));
            that.canvas.off('mouse:down');
        });
    };
    WhiteBoardHelper.prototype.line = function(that) {
        that.canvas.isDrawingMode = false;
        if (that.canvas.getContext) {
            var context = that.canvas.getContext('2d');
        }
        that.canvas.observe('mouse:down', function(e) {
            mousedown(e);
        });
        that.canvas.observe('mouse:move', function(e) {
            mousemove(e);
        });
        that.canvas.observe('mouse:up', function(e) {
            mouseup(e);
        });
        var started = false;
        var startX = 0;
        var startY = 0;
        /* Mousedown */
        function mousedown(e) {
            var mouse = that.canvas.getPointer(e.e);
            started = true;
            startX = mouse.x;
            startY = mouse.y;
            that.canvas.off('mouse:down');
        }
        /* Mousemove */
        function mousemove(e) {
            if (!started) {
                return false;
            }
            that.canvas.off('mouse:move');
        }
        /* Mouseup */
        function mouseup(e) {
            if (started) {
                var mouse = that.canvas.getPointer(e.e);
                that.canvas.add(new fabric.Line([startX, startY, mouse.x, mouse.y], {
                    stroke: "#000000",
                    strokeWidth: 2
                }));
                that.canvas.renderAll();
                that.canvas.calcOffset();
                started = false;
                that.canvas.off('mouse:up');
            }
        }
    };
    WhiteBoardHelper.prototype.save = function(that) {
        that.canvas.isDrawingMode = false;
        if (!window.localStorage) {
            alert("This function is not supported by your browser.");
            return;
        }
        // save to localStorage
        var json = JSON.stringify(that.canvas);
        window.localStorage.setItem("hoge", json);
    };
    WhiteBoardHelper.prototype.load = function(that) {
        that.canvas.isDrawingMode = false;
        if (!window.localStorage) {
            alert("This function is not supported by your browser.");
            return;
        }
        //clear that.canvas
        that.canvas.clear();
        //load from localStorage
        that.canvas.loadFromJSON(window.localStorage.getItem("hoge"));
        // re-render the that.canvas
        that.canvas.renderAll();
        // optional
        that.canvas.calcOffset();
    };
    WhiteBoardHelper.prototype.delete = function(that) {
        that.canvas.isDrawingMode = false;
        if (!window.localStorage) {
            alert("This function is not supported by your browser.");
            return;
        }
        if (confirm('Are you sure?')) {
            window.localStorage.removeItem("hoge");
        }
    };
    WhiteBoardHelper.prototype.clear = function(that) {
        that.canvas.isDrawingMode = false;
        if (confirm('Are you sure?')) {
            that.canvas.clear();
        }
    };
    WhiteBoardHelper.prototype.remove = function(that) {
        that.canvas.isDrawingMode = false;
        var activeObject = that.canvas.getActiveObject(),
            activeGroup = that.canvas.getActiveGroup();
        if (activeObject) {
            if (confirm('Are you sure?')) {
                that.canvas.remove(activeObject);
            }
        } else if (activeGroup) {
            if (confirm('Are you sure?')) {
                var objectsInGroup = activeGroup.getObjects();
                that.canvas.discardActiveGroup();
                objectsInGroup.forEach(function(object) {
                    that.canvas.remove(object);
                });
            }
        }
    };
    WhiteBoardHelper.prototype.run = function(that) {
        that.canvas.calcOffset();
        document.onkeyup = function(e) {
            that.canvas.renderAll();
        };
        setTimeout(function() {
            that.canvas.calcOffset();
        }, 100);
    };
    win.WhiteBoardHelper = WhiteBoardHelper;
}(window));