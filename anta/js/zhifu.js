$(function() {
		$.fn.extend({

			PopPlugin: function() {
				let box = $(this)[0];
				let divBtn = null;

				function setPosition() {
					//所有关于offset相关的属性，必须要保证元素存在
					box.style.display = "block";
					box.style.left = window.innerWidth / 2 - box.offsetWidth / 2 + "px";
					box.style.top = window.innerHeight / 2 - box.offsetHeight / 2 + "px";
					createBtn();
				}

				function createBtn() {
					if (divBtn == null) {
						divBtn = document.createElement("button");
					}
					divBtn.innerHTML = "X";
					divBtn.style.width = 50 + "px";
					divBtn.style.height = 25 + "px";
					//更改位置必须先定位
					divBtn.style.position = "absolute";
					box.appendChild(divBtn);
					divBtn.style.left = box.offsetWidth - divBtn.offsetWidth + "px";
					closeBtn();
				}

				function closeBtn() {
					divBtn.onclick = function() {
						box.style.display = "none";
					}
				}
				setPosition();

			}

		});

	});
