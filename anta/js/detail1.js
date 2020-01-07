$(function() {
	$(".header").load("header.html");

	$(".nav").load("nav.html", function() {
		let num = 0;
		$(".ri-list-lf-car").click(function() {
			num++;
			if (num % 2 != 0) {
				$(".ri-list").css({
					"right": 0,
					"transition": "1s"
				});

			} else {
				$(".ri-list").css("right", -280);
			}
		});
		// 点击回到顶点
		$(".ri-list-lf-top").click(function() {
			$('body, html').scrollTop(0);
		});
		// 阻止冒泡
		$(".n-ri-input").click(function(evt) {
			var e = evt || event;
			e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
			$(".hot-word").css("display", "block");
		});

		$("body").click(function() {
			$(".hot-word").css("display", "none");
		});
	});

	$(".footer").load("footer.html");

	// 监听事件 监听滚动条高度

	window.addEventListener('scroll', function() {
		let t = $('body, html').scrollTop();

		if (t > 0) {
			$(".ri-list").css("top", 0);

			$(".nav").addClass("nav-s");

			$(".ri-list").css({
				"top": 0,
				"transition": "0.3s"
			});

			$(".ri-list-lf-top").css("display", "block");

		} else {
			$(".nav").removeClass("nav-s");
			$(".ri-list").css("top", 52);
			$(".ri-list-lf-top").css("display", "none");
		}
	});
	// 选择放大
	$('.i').click(function() {
		fd($(this).index());
		// $('.i').eq($(this).index()).css({
		// 	'border':'3px solid pink'
		// }).siblings().css({
		// 	'border': 'none'
		// })

	})

	let z = 0;
	// 选择
	$('.xz-i').click(function() {
		$('.at-list').eq($(this).index()).css({
			'display': 'block'
		}).siblings().css({
			'display': 'none'
		})


		// $('.xz-i').eq($(this).index()).css({
		// 	'border':'3px solid red'
		// }).siblings().css({
		// 	'border': 'none'
		// })
		z = $(this).index();
		fd(0);
		return z;
	})


	function fd(x) {
		let y = x + 1;
		$('.contion-bot-cen').css({
			'background': 'url(img-detail1/11941101-' + z + '-' + y + '.jpg) no-repeat ',
			'backgroundSize': '594px 594px'
		})
		$('.bBox').css({
			'background': 'url(img-detail1/11941101-' + z + '-' + y + '.jpg) no-repeat ',
			'backgroundSize': '1390px 1697px'
		})
	}

	// 添加进数据库
	// let goodsBox = [];
	$('#first-ipt').click(function() {

		// 判断
		let data = JSON.parse(localStorage.getItem('data'));
		// console.log(data);
		if (data == null || data == '') {
			var goodsBox = [];
		} else {
			var goodsBox = data;
		}


		// console.log(this);
		let flag = false; // 表示不存在
		// 编号
		let bianhao = $('#kh-num').html();
		// 标题
		let title = $('#title-h1').html() + '-' + $('#kh-num').html();
		// 价格
		let price = $('.p-b-o1').html();
		// 图片路径
		let imgSrc = $('.contion-bot-cen').css(
			'backgroundImage'
		).split("\"")[1]

		// 每个商品作为一个对象
		let obj = {
			"bianhao": bianhao,
			"imgSrc": imgSrc,
			"title": title,
			"price": price,
			"num": 1
		}
		// console.log(obj);
		//判断数组存在当前点击的商品与否
		for (let x = 0; x < goodsBox.length; x++) {
			if (imgSrc == goodsBox[x].imgSrc) {
				goodsBox[x].num = goodsBox[x].num + 1;
				flag = true;
			}
		}
		if (flag == false) {
			goodsBox.push(obj);
		}

		// 存取 只能存字符串JSON.stringify()
		localStorage.setItem('data', JSON.stringify(goodsBox));
		// 顶部总计
		let addNum = 0;
		for (let i = 0; i < data.length; i++) {
			addNum += data[i].num;
		}
		$('#shopcar-num').html(addNum);
		alert('添加成功,快去付款吧!');
	})
	
		// 去支付
		$('#last-ipt').click(function() {
			 window.location.href='shopcar.html';
		})

})



let osBox = document.getElementsByClassName("contion-bot-cen")[0];
let odBox = document.getElementsByClassName("bBox")[0];
let omask = document.getElementsByClassName("mask")[0];

let mf = new Magnifier(osBox, odBox, omask);

mf.getEvent();


// 点击切换
$('.current').click(function(){
	$('.current').css({
		'backgroundColor': '#b5b5b5'
	})
	$('.evaluate').css({
		'backgroundColor': '#0d0d0d'
	})
	$('.current-i').css({
		'background':'url(img-detail1/dtl-buy.png) no-repeat center -59px'
	})
	$('.evaluate-i').css({
		'background':'none'
	})
	$('.detail-box').css({
		'display':'block'
	})
	$('.comment-box').css({
		'display':'none'
	})
})

$('.evaluate').click(function(){
	$('.current').css({
		'backgroundColor': '#0d0d0d'
	})
	$('.evaluate').css({
		'backgroundColor': '#b5b5b5'
	})
	$('.evaluate-i').css({
		'background':'url(img-detail1/dtl-buy.png) no-repeat center -59px'
	})
	$('.current-i').css({
		'background':'none'
	})
	$('.detail-box').css({
		'display':'none'
	})
	$('.comment-box').css({
		'display':'block'
	})
})
