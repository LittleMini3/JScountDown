/**该js用于js原生编写的倒计时插件
 */

var count = {
	getClass: function (name) {
		//返回类对象
		return document.getElementsByClassName(name);
	},
	countlist: [], //装计时器的数组
	two: function (n) {
		//判断是否需要在个位数前面加一个0
		return n >= 0 && n < 10 ? '0' + n : '' + n;
	},
	countTime: function (data,s,tBox) {
		/**进行倒计时的方法 
		 * 参数：
		 * begain:开始时间搓
		 * end：结束的时间搓
		 * eindex:装倒计时显示的元素的下标
		 * style:计时器分隔符的显示风格支持  '时分秒'/ ':'
		 * days:是否显示天数
		 * boxClass:用来装计时器的盒子的class类名，必须为字符串
		 */
		var second = s;
		if (data.days) {
			var day = Math.floor(second / 86400); //整数部分代表的是天；一天有24*60*60=86400秒 ；
			second = second % 86400; //余数代表剩下的秒数；		
		}
		var hour = Math.floor(second / 3600); //整数部分代表小时；
		second %= 3600; //余数代表 剩下的秒数；
		var minute = Math.floor(second / 60);
		second %= 60;
		var str = null;

		if (hour <= 0 && minute <= 0 && second <= 0) {
			count.countlist[data.eindex].ing = false;
			day = "0";
			hour = "0";
			minute = "0";
			second = "0";
		}

		if (data.style == "时分秒") {
			if (data.days) {
				str = count.two(day) + '<span class="time">天</span>' +
					count.two(hour) + '<span class="time">时</span>' +
					count.two(minute) + '<span class="time">分</span>' +
					count.two(second) + '<span class="time">秒</span>';
			} else {
				str = count.two(hour) + '<span class="time">时</span>' +
					count.two(minute) + '<span class="time">分</span>' +
					count.two(second) + '<span class="time">秒</span>';
			}
		} else if (data.style == ":") {
			if (data.days) {
				str = count.two(day) + '<span class="time">:</span>' +
					count.two(hour) + '<span class="time">:</span>' +
					count.two(minute) + '<span class="time">:</span>'; +
				count.two(second);
			} else {
				str = count.two(hour) + '<span class="time">:</span>' +
					count.two(minute) + '<span class="time">:</span>' +
					count.two(second);
			}
		} else {
			console.error('can not find parameter "style"');
			count.countlist[data.eindex].ing = false;
			return;
		}
		tBox.innerHTML = str;
	},
	count: function (data,callback) {
		/**进行倒计时的方法 
		 * 参数：
		 * data:包含所需要参数的对象
		 * begain:开始时间搓
		 * end：结束的时间搓,一定比开始时间大
		 * eindex:装倒计时显示的元素的下标
		 * style:计时器分隔符的显示风格支持  '时分秒'/ ':'
		 * days:是否显示天数
		 * boxClass:用来装计时器的盒子的class类名，必须为字符串
		/**开启倒计时 */

		if (typeof data.boxClass != 'string') {
			console.error('boxClass must be string');
			return;
		}
		if (typeof data.days != 'boolean') {
			console.error('days must be boolean');
			return;
		}
		if (typeof data.days != 'boolean') {
			console.error('days must be boolean');
			return;
		}
		if (typeof data.begain != 'number' || typeof data.end != 'number') {
			console.error('time must be number');
			return;			
		}
		if (typeof data.style != 'string') {
			console.error('style must be string');
			return;			
		}
		if (typeof data.eindex != 'number') {
			console.error('eindex must be number');
			return;			
		}

		var time = {
			name: 'count' + data.eindex,
			ing: true,
			co: null
		}
		count.countlist.push(time);
		var tBox = count.getClass(data.boxClass)[data.eindex];
		var b = data.begain; //开始时间
		var e = data.end; //结束时间
		var s = Math.floor((e - b)); //开始到结束的秒数
		count.countlist[data.eindex].co = setInterval(function () {
			if (!count.countlist[data.eindex].ing) {
				//结束倒计时器
				clearInterval(count.countlist[data.eindex].co);
				return;
			}
			count.countTime(data,s,tBox);
			s --;
			if (s <= 0) {
				//倒计时结束时会将下标做完回调函数的结果返回
				callback(data.eindex);
			}
		}, 1000);
	}
}