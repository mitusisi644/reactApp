import React, { Component } from 'react';
import indexStyle from './index.css';

 
class tranCard extends Component {
	render() {
		return(
			<div>
				<div className={indexStyle["card-item"]}>
					<div className={indexStyle["card-title"]}>进行中</div>
					<div className={indexStyle["card-info"]}>
						<span>交易甲方：<a>粗嘏</a></span>
						<span>交易乙方：<a>布亦</a></span>
						<span>交易hash：<a>ikejiuejkdsjfoi237484j2k34h29034ij4b2jk4i2yi4ghb4hj22tu423ghjsf</a></span>
						<span>交易状态：<a>甲方确认</a></span>
						<span>状态时间：<a>2018.07.09 10:10:10:231</a></span>
					</div>
					<div className={indexStyle["card-btn"]}><span>详情</span></div>
				</div>
			</div>
		);
	}
}
export default tranCard;