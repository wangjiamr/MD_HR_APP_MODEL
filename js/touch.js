$(function() {
	var $message_box = $('.message_box');
	var reg_transform = /\-?[0-9]+\.?[0-9]*/g;
	var currentPage = 0;
	var _firstY = 0;
	var _finishY = 0;
	var _firstX = 0;
	var _finishX = 0;
	var _startX = 0;
	var _startY = 0;

	function touchStart(event) {
		_startX = event.touches[0].clientX;
		_startY = event.touches[0].clientY;
		_firstY = _startY;
		_firstX = _startX;
	}

	function touchMove(event) {
		var touches = event.touches;
		var _endX = event.touches[0].clientX;
		var _endY = event.touches[0].clientY;
		event.preventDefault();
		_finishY = _endY;
		_finishX = _endX;
		var _absY = Math.abs(_endY - _startY);//Y轴便宜量
		var _absX = Math.abs(_endX - _startX);//X轴便宜量
		var lastX = parseInt($this.css('left'));//当前给css付的值
		var $this = $(this);
		if (Math.abs(_endY - _startY) > Math.abs(_endX - _startX)) {
			_startY = _endY;
			return;
		} else {
			if (_startX > _endX) {
				$this.css({
					'left': (parseInt(lastX) - _absX) + 'px'
				});
				console.log(lastX);
			} else {
				$this.css({
					'left': (parseInt(lastX) + _absX) + 'px'
				});
			}
			_startX = _endX;
		}

	}
	var timeBindTouch = null;

	function touchEnd(event) {
		if (_firstX == _finishX) {
			return;
		} else {
			unbindTouch();
			var ul_top = parseInt($this.css('left'));
//			pianli = _firstX > _finishX ? -b_w / 2 : b_w / 2;
			if (ul_top >= 0) {
				$this.animate({
					'left': 0
				});
				currentPage = 0;
			} 
//			else {
//				if (ul_top <= -(b_w * (b_l - 1))) {
//					$message_box.animate({
//						'left': -b_w * (b_l - 1) + 'px'
//					});
//					currentPage = b_l - 1;
//				} else {
//					$message_box.animate({
//						'left': Math.round((pianli + ul_top) / b_w) * b_w
//					});
//					currentPage = Math.round((pianli + ul_top) / b_w);
//				}
//			}
//			currentPage = Math.abs(currentPage);
			$this.addClass('current').siblings().removeClass('current');
			_firstY = 0;
			_finishY = 0;
			_finishX = 0;
			_firstX = 0;
		}
	}

	function bindTouch() {
		$message_box.bind('touchstart', function() {
			touchStart(event);
		});
		$message_box.bind('touchmove', function() {
			touchMove(event);
		});
		$message_box.bind('touchend', function() {
			touchEnd(event);
		});
	}
	bindTouch();

	function unbindTouch() {
		$message_box.unbind('touchstart');
		$message_box.unbind('touchmove');
		$message_box.unbind('touchend');
	}
})