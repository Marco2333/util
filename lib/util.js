(function(window,undefined) {
	var Util = {
		// 函数绑定
		bind: function(fn, me) {
			return function() { 
				return fn.apply(me, arguments); 
			}
		},
		// 对象扩展
		extend: function(custom, defaults) {
			var key,value;
			for(key in custom) {
				if((value = custom[key]) != null) {
					defaults[key] = value;
				}
			}
			return defaults;
		},
		// 节流器
		throttle: function(c) {
			var isClear = c, fn;
			if(typeof isClear === 'boolean') {
				fn = arguments[1];
				fn.__throttleID && clearTimeout(fn.__throttleID);
			} else {
				fn = isClear;
				param = arguments[1];
				var p = this.extend({
					context: null,
					args: [],
					time: 100
				},param);
				arguments.callee(true, fn);
				fn.__throttleID = setTimeout(function() {
					fn.apply(p.context, p.args);
				}, p.time)
			}
		},
		// 支持不兼容getElementsByClassName的浏览器
		getEleByClass: function(className, node, tag) {
			if ( node == null ) {
			    node = document;
			}
			if ( tag == null ) {
				tag = '*';
			}
			var i, j, classElements = new Array(),
				pattern = new RegExp("(^|\\s)"+className+"(\\s|$)"), 
				els = node.getElementsByTagName(tag),
				elsLen = els.length;
			for (i = 0, j = 0; i < elsLen; i++) {
		        if ( pattern.test(els[i].className) ) {
	                classElements[j++] = els[i];
		        }
			}
			return classElements;
		}
	};

	Util.Event = {
	    // 页面加载完成后
	    readyEvent : function(fn) {
	        if (fn==null) {
	            fn=document;
	        }
	        var oldonload = window.onload;
	        if (typeof window.onload != 'function') {
	            window.onload = fn;
	        } else {
	            window.onload = function() {
	                oldonload();
	                fn();
	            };
	        }
	    },
	    // 视能力分别使用dom0||dom2||IE方式 来绑定事件
	    // 参数： 操作的元素,事件名称 ,事件处理程序
	    addEvent : function(element, type, handler) {
	        if (element.addEventListener) {
	            //事件类型、需要执行的函数、是否捕捉
	            element.addEventListener(type, handler, false);
	        } else if (element.attachEvent) {
	            element.attachEvent('on' + type, function() {
	                handler.call(element);
	            });
	        } else {
	            element['on' + type] = handler;
	        }
	    },
	    // 移除事件
	    removeEvent : function(element, type, handler) {
	        if (element.removeEventListener) {
	            element.removeEventListener(type, handler, false);
	        } else if (element.datachEvent) {
	            element.detachEvent('on' + type, handler);
	        } else {
	            element['on' + type] = null;
	        }
	    },
	    // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
	    stopPropagation : function(ev) {
	        if (ev.stopPropagation) {
	            ev.stopPropagation();
	        } else {
	            ev.cancelBubble = true;
	        }
	    },
	    // 取消事件的默认行为
	    preventDefault : function(event) {
	        if (event.preventDefault) {
	            event.preventDefault();
	        } else {
	            event.returnValue = false;
	        }
	    },
	    // 获取事件目标
	    getTarget : function(event) {
	        return event.target || event.srcElement;
	    },
	    // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
	    getEvent : function(e) {
	        var ev = e || window.event;
	        if (!ev) {
	            var c = this.getEvent.caller;
	            while (c) {
	                ev = c.arguments[0];
	                if (ev && Event == ev.constructor) {
	                    break;
	                }
	                c = c.caller;
	            }
	        }
	        return ev;
	    }
	};

	window.Util = Util;
})(window)