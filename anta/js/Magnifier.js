class Magnifier {
	constructor(newSbox, newBbox, newMask) {
		this.sbox = newSbox;
		this.bbox = newBbox;
		this.mask = newMask;
	}

	onmouseover() {
		let that = this;
		this.sbox.onmouseover = function() {
			that.bbox.style.display = "block";
			that.mask.style.display = "block";
		}
	}

	onmouseout() {
		let that = this;
		this.sbox.onmouseout = function() {
			that.bbox.style.display = "none";
			that.mask.style.display = "none";
		}
	}

	onmousemove() {
		let that = this;
		this.sbox.onmousemove = function(evt) {
			let e = evt || event;

			let left = e.pageX - this.offsetLeft - that.mask.offsetWidth / 2;
			let top = e.pageY - that.sbox.offsetTop - that.mask.offsetHeight / 2;


			if (left < 0) {
				left = 0;
			}

			let maxLeft = this.offsetWidth - that.mask.offsetWidth;

			if (left > maxLeft) {
				left = maxLeft;
			}

			if (top < 0) {
				top = 0;
			}

			let maxTop = this.offsetHeight - that.mask.offsetHeight;

			if (top > maxTop) {
				top = maxTop;
			}

			let x = that.bbox.offsetWidth * left / that.mask.offsetWidth;
			let y = that.bbox.offsetHeight * top / that.mask.offsetHeight;

			that.mask.style.left = left + "px";
			that.mask.style.top = top + "px";

			that.bbox.style.backgroundPositionX = -x + "px";
			that.bbox.style.backgroundPositionY = -y + "px";
		}
	}

	getEvent() {
		this.onmouseover();
		this.onmouseout();
		this.onmousemove();
	}
}
