$(function() {
	$(".footer").load("footer.html");
	$('.nav').load('login-nav.html', function() {
		window.addEventListener('scroll', function() {
			let t = $('body, html').scrollTop();

			if (t > 20) {

				$(".list-o3").css({
					"height": 73,
					"transition": "0.3s"
				});

			} else {
				$(".list-o3").css({
					"height": 0
				});
			}
		});

		$(".list-o3").click(function() {
			$('body, html').scrollTop(0);
		});

	});

});


// 创建
class Car {
	constructor() {

	}
	//渲染页面
	render() {
		let data = JSON.parse(localStorage.getItem('data'));

		let table = document.getElementsByClassName('contion-yes-tab')[0];
		let tableson = table.lastElementChild;
		let tablesun = table.lastElementChild.firstElementChild;

		for (let i = 0; i < data.length; i++) {
			let newtr = document.createElement("tr");
			newtr.setAttribute("class", "item")
			newtr.innerHTML =
				`
					<td align="center">
						<input class="checkbox" type="checkbox" checked />
					</td>
					<td class="p-numbered">${data[i].bianhao}</td>
					<td class="p-img">
						<a href="">
							<img class="chaimg" src="${data[i].imgSrc}" width="50" height="50">
						</a>
					</td>
					<td class="p-name">
						<h2>
							<a href="" target="_blank">${data[i].title}</a>
						</h2>
						<span class="promise411">颜色:荧光亮深红/橘黄/安踏白 尺码:41</span>
					</td>
					<td class="p-price">
						<span class="u_price" style="text-decoration: line-through;">¥${data[i].price}</span>
						<span class="price">￥${data[i].price}</span>
					</td>
					<td class="p-quantity">
						<div class="quantity-form">
							<a class="decrement">-</a>
							<span type="text" class="quantity-text" />${data[i].num}</span>
							<a class="increment" style="float:right;" >+</a>
						</div>
					</td>
					<td class="p-remove">
						<a class="cart-remove" style="cursor: pointer;">删除</a>
					</td>
				`
			tableson.insertBefore(newtr, tablesun);
		}

		this.getTotalPrice();
		this.bindEvent();
	}


	// 改变总价
	getTotalPrice() {
		let sum = 0;

		for (let i = 0; i < data.length; i++) {
			let num = $('.quantity-text').eq(i).html();
			// sum += data[i].price * data[i].num;
			sum += data[i].price * num;

		}
		$('.total_price').html('¥' + sum + '.00');
	}

	// 加
	addGoodsNum(i) {
		let num = $('.quantity-text').eq(i).html();
		num = +num + 1;
		$('.quantity-text').eq(i).html(num);

		let oimg = document.getElementsByClassName('chaimg');
		this.changeNum(oimg[i].src, '+');
		this.getTotalPrice();
	}

	// 改变存储的localstroage
	changeNum(imgsrc, flag) {
		let data = JSON.parse(localStorage.getItem('data'));
		for (let i = 0; i < data.length; i++) {
			if (imgsrc == data[i].imgSrc) {
				if (flag == '+') {
					data[i].num += 1;
				} else if (flag == '-') {
					data[i].num -= 1;
				}
			}
		}
		// this.getTotalPrice();
		localStorage.setItem('data', JSON.stringify(data));
	}

	// 减
	reduceGoodsNum(i) {
		let num = $('.quantity-text').eq(i).html();
		if (num <= 1) {
			this.deleteGoods(i);
			this.getTotalPrice();
		} else {
			num = num - 1;
			$('.quantity-text').eq(i).html(num);
			let oimg = document.getElementsByClassName('chaimg');
			this.changeNum(oimg[i].src, '-');
			this.getTotalPrice();
		}
	}

	// 删除
	deleteGoods(i) {
		let data = JSON.parse(localStorage.getItem('data'));
		let oimg = document.getElementsByClassName('chaimg');

		// 找删除项
		// for (let j = 0; j < data.length; j++) {
		for (let j = data.length - 1; j >= 0; j--) {
			if (oimg[i].src == data[j].imgSrc) {
				data.splice(j, 1);
			}
		}
		// 重设
		localStorage.setItem('data', JSON.stringify(data));
		$('.cart-remove').eq(i).parent().parent().remove();

		this.getTotalPrice();
	}

	// 清空
	deleteAll() {
		let all = document.getElementsByClassName("item");
		// all.remove();
		for (let i = all.length - 1; i >= 0; i--) {
			all[i].remove();
		}

		let data = JSON.parse(localStorage.getItem('data'));
		localStorage.setItem('data', JSON.stringify(null));
		this.getTotalPrice();
	}

	// 选中删除
	deleteXZ() {
		let ocheckbox = document.getElementsByClassName("checkbox");
		let that = this;
		for (let i = ocheckbox.length - 1; i >= 0; i--) {
			if (ocheckbox[i].checked == true) {
				ocheckbox[i].parentElement.parentElement.remove();
				that.deleteGoods(i);
			}
		}

	}


	bindEvent() {
		let that = this;
		// 加
		let addBtn = document.getElementsByClassName('increment');
		for (let i = 0; i < addBtn.length; i++) {
			addBtn[i].onclick = function() {
				that.addGoodsNum(i);
				// console.log(i)
			}
		}
		// 减
		let reduceBtn = document.getElementsByClassName('decrement');
		for (let i = 0; i < reduceBtn.length; i++) {
			reduceBtn[i].onclick = function() {
				that.reduceGoodsNum(i);
				// console.log(i)
			}
		}
		// 删
		let deleteBtn = document.getElementsByClassName('cart-remove');
		for (let i = 0; i < deleteBtn.length; i++) {
			deleteBtn[i].onclick = function() {
				that.deleteGoods(i);
			}
		}
		// 删全部
		let deleteAll = document.getElementsByClassName('deleteAll')[0];
		deleteAll.onclick = function() {
			that.deleteAll();
		}


		// 删选中
		let deletexz = document.getElementsByClassName('deletexz')[0];
		deletexz.onclick = function() {
			that.deleteXZ();
		}
	}
}

// 判断
let data = JSON.parse(localStorage.getItem('data'));
if (data == '' || data == null) {
	$('.contion-no').css({
		'display': 'block'
	});
	$('.contion-yes').css({
		'display': 'none'
	});
} else {
	$('.contion-no').css({
		'display': 'none'
	});
	$('.contion-yes').css({
		'display': 'block'
	});
	let p = new Car();
	p.bindEvent();
	p.getTotalPrice();
	p.render();
}


$(".last-ta").click(function() {
	$("#box").PopPlugin();
});
