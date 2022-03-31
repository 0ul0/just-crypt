$(function(){

	$.prototype.edit = function(txt){
		$(this).val(txt).trigger("input");
	};

	$.prototype.scroll = function(){
		var pos = $(this).offset().top - 30;
		$("body").animate({
			scrollTop: pos
		}, 500);
	};

	String.prototype.size = function(){
		var res = 0;
		for(var i = 0, len = this.length; i < len; i++){
			if(escape(this.charAt(i)).length > 4) res += 2;
			else res++;
		}
		return res;
	};

	String.prototype.toInt = function(){
		return this.match(/^\d+$/) ? parseInt(this) : 0;
	};

	$("body").on("mousedown", "button", function(){
		$(this).addClass("active");
	}).on("mouseup", "button", function(){
		$(this).removeClass("active");
	}).on("mouseleave", "button", function(){
		$(this).removeClass("active");
	});

	$("body").on("click", ".copy-btn", function(){
		var target = $(this).data("target");
		$(target).select();
		document.execCommand('copy');
	});

	$("body").on("click", ".clear-btn", function(){
		var target = $(this).data("target");
		$(target).edit('');
	});

	$("body").on("click", ".save-btn", function(){
		var target = $(this).data("target");
		var link = document.createElement("a");

		now = new Date();
		year = "" + now.getFullYear();
		month = "" + (now.getMonth() + 1);
		if (month.length == 1) month = "0" + month;
		day = "" + now.getDate();
		if (day.length == 1) day = "0" + day;
		hour = "" + now.getHours();
		if (hour.length == 1) hour = "0" + hour;
		minute = "" + now.getMinutes();
		if (minute.length == 1) minute = "0" + minute;
		second = "" + now.getSeconds();
		if (second.length == 1) second = "0" + second;
		link.download = year + "-" + month + "-" + day + "_" + hour + ":" + minute + ":" + second + ".txt";

		link.href = "data:text/plain,"+encodeURIComponent($(target).val());
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		delete link;
	});

	

	function setTitle(title){
		$("title").html((title ? title + " | " : "") + "just-crypt");
	}

	/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

	urlParser();
	window.onhashchange=function(e){
		urlParser();
	};

	function urlParser(){
		hash = location.hash.toLowerCase();
		hashes = hash.split("/");
		if(hashes.length < 2 || hashes[0] != "#!"){
			location.hash = "#!/";
			return;
		}

		var maker = new formMaker($(".tool-box"));
		var is_not_found = false;
		switch(hashes[1]){
			case "":
				setTitle();
				maker.addH2("", "", 'Добро пожаловать в just-crypt!');
				maker.addP("", "", 'Выберите действие в боковом меню слева');
				
				maker.addP("", "", 'Этот вебсайт оптимизирован для ПК версии');
				break;


			case "encrypt":
				maker.addPath('./#!/'+hashes[1], "Алгоритм /");

				// start encrypt
				switch(hashes[2]){
					case "", undefined:
						$("#category-encrypt").scroll();
						break;

					case "aes":
						setTitle("AES Encrypt");
						maker.addPath('./#!/'+hashes[1]+'/'+hashes[2], "AES");

						maker.addH2("work-type", "", "Алгоритм AES");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addTextarea("key-text", "", "Ключ", false, false, "", true);
						maker.addButton("encrypt-btn", "", "Зашифровать");
						maker.addButton("decrypt-btn", "", "Расшифровать");
						maker.addButton("", "swap-btn", "Поменять местами");
						maker.addTextarea("after-text", "", "Результат", "12", false, "", true);
						$("html,body").scroll();

						$("#encrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.AES.encrypt($("#before-text").val(), $("#key-text").val())
							);
						});
						$("#decrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.enc.Utf8.stringify(
									CryptoJS.AES.decrypt($("#before-text").val(), $("#key-text").val())
								)
							);
						});
						break;

					case "rc4":
						setTitle("RC4 Encrypt");
						maker.addPath('./#!/'+hashes[1]+'/'+hashes[2], "RC4");

						maker.addH2("work-type", "", "RC4 Encrypt");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addTextarea("key-text", "", "Ключ", false, false, "", true);
						maker.addButton("encrypt-btn", "", "Зашифровать");
						maker.addButton("decrypt-btn", "", "Расшифровать");
						maker.addButton("", "swap-btn", "Поменять местами");
						maker.addTextarea("after-text", "", "Результат", "12", false, "", true);
						$("html,body").scroll();

						$("#encrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.RC4.encrypt($("#before-text").val(), $("#key-text").val())
							);
						});
						$("#decrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.enc.Utf8.stringify(
									CryptoJS.RC4.decrypt($("#before-text").val(), $("#key-text").val())
								)
							);
						});
						break;

					case "des":
						setTitle("DES Encrypt");
						maker.addPath('./#!/'+hashes[1]+'/'+hashes[2], "DES");

						maker.addH2("work-type", "", "DES Encrypt");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addTextarea("key-text", "", "Ключ", false, false, "", true);
						maker.addButton("encrypt-btn", "", "Зашифровать");
						maker.addButton("decrypt-btn", "", "Расшифровать");
						maker.addButton("", "swap-btn", "Поменять местами");
						maker.addTextarea("after-text", "", "Результат", "12", false, "", true);
						$("html,body").scroll();

						$("#encrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.DES.encrypt($("#before-text").val(), $("#key-text").val())
							);
						});
						$("#decrypt-btn").click(function(){
							$("#after-text").edit(
								CryptoJS.enc.Utf8.stringify(
									CryptoJS.DES.decrypt($("#before-text").val(), $("#key-text").val())
								)
							);
						});
						break;

					case "blowfish":
						setTitle("Blowfish Encrypt");
						maker.addPath('./#!/'+hashes[1]+'/'+hashes[2], "Blowfish");

						maker.addH2("work-type", "", "Blowfish Encrypt");
						maker.addTextarea("before-text", "", "Text", "12", true, "", true);
						maker.addTextarea("key-text", "", "Ключ", false, false, "", true);
						maker.addButton("encrypt-btn", "", "Зашифровать");
						maker.addButton("decrypt-btn", "", "Расшифровать");
						maker.addButton("", "swap-btn", "Поменять местами");
						maker.addTextarea("after-text", "", "Результат", "12", false, "", true);
						$("html,body").scroll();

						$("#encrypt-btn").click(function(){
							$("#after-text").edit(
								blowfish.encrypt($("#before-text").val(), $("#key-text").val(), {cipherMode: 0, outputType: 0})
							);
						});
						$("#decrypt-btn").click(function(){
							$("#after-text").edit(
								blowfish.decrypt($("#before-text").val(), $("#key-text").val(), {cipherMode: 0, outputType: 0})
							);
						});
						break;

				}
				// end encrypt
				break;

			default:
				is_not_found = true;
				break;
		}
		if(is_not_found){
			setTitle("Under Construction");
			maker.addH2("", "", 'Under Construction');
			maker.addP("", "", 'Plz select another cipher at the left list.');
			$("html,body").scroll();
		}

		$(".swap-btn").click(function(){
			var after = $("#after-text").val(), before = $("#before-text").val();
			$("#after-text").edit(before);
			$("#before-text").edit(after);
		});

		$(".category-box .group ul li a").each(function(key, val){
			if($(this).attr("href") == "/" + hash){
				$(this).parent().addClass("active");
			}else{
				$(this).parent().removeClass("active");
			}
		});

	}

	/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

	function formMaker (target) {
		this.target = target;
		this.target.html('');

		this.addHtml = function(html){
			this.target.append(
				html
			);
		};

		this.addH2 = function(id, cls, value){
			this.target.append(
				'<h2'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
				'>'+
					value + 
				'</h2>'
			);
		};

		this.addSpan = function(id, cls, value){
			this.target.append(
				'<span'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
				'>'+
					value + 
				'</span>'
			);
		};

		this.addP = function(id, cls, value){
			this.target.append(
				'<p'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
				'>'+
					value + 
				'</p>'
			);
		};

		this.addDiv = function(id, cls, value){
			this.target.append(
				'<div'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
				'>'+
					value + 
				'</div>'
			);
		};

		this.addLink = function(id, cls, href, value){
			this.target.append(
				'<a'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
					(href ? ' href="'+href+'"' : '') +
				'>'+
					value + 
				'</a>'
			);
		};

		this.addPath = function(href, value){
			this.target.append(
				'<span class="path"></span>' +
				'<a'+
					(href ? ' href="'+href+'"' : '') +
				'>'+
					value + 
				'</a>'
			);
		};

		this.addTextarea = function(id, cls, title, rows, autofocus, value, toolbar){
			if(title){
				this.target.append(
					'<div class="title">' +
						title +
					'</div>'
				);
			}
			if(rows){
				this.target.append(
					'<textarea'+
						(id ? ' id="'+id+'"' : '') +
						(cls ? ' class="'+cls+'"' : '') +
						(rows ? ' rows="'+rows+'"' : '') +
						(autofocus ? ' autofocus' : '') +
					'>'+
					value + 
					'</textarea>'
				);
			}else{
				this.target.append(
					'<input type="text"'+
						(id ? ' id="'+id+'"' : '') +
						(cls ? ' class="'+cls+'"' : '') +
						(autofocus ? ' autofocus' : '') +
						(value ? ' value="'+value+'"' : '') +
					'>'
				);
			}
			if(id && autofocus){
				$("#"+id).focus();
			}
			if(id && toolbar){
				this.target.append(
					'<div class="toolbar">' +
						'<span title="Length of text">Length: <span id="'+id+'-length">'+value.length+'</span></span>' +
						' | ' +
						'<span title="Size of text (bytes)">Size: <span id="'+id+'-size">'+value.size()+'</span></span>' +
						' | ' +
						'<a class="copy-btn" data-target="#'+id+'" title="Copy to clipboard">Copy</a>' +
						' | ' +
						'<a class="clear-btn" data-target="#'+id+'" title="Clear to text">Clear</a>' +
						' | ' +
						'<a class="save-btn" data-target="#'+id+'" title="Save to file">Save</a>' +
					'</div>'
				);
				$("#"+id).on("input",function(){
					var txt = $(this).val();
					$("#"+id+"-length").html(txt.length);
					$("#"+id+"-size").html(txt.size());
				});
			}
		};

		this.addButton = function(id, cls, value){
			this.target.append(
				'<button'+
					(id ? ' id="'+id+'"' : '') +
					(cls ? ' class="'+cls+'"' : '') +
				'>'+
					value + 
				'</button>'
			);
		};
	}

});
