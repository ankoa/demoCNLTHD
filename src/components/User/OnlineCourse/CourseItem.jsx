import React from "react";
import "./CourseItem.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function (props) {
  let { image, title, numberOfReview, numberOfStudent, price, listingPrice, reduce } = props
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="courses-grid-item">
        <a href="#">
          <div className="courses-grid-item-image">
            <img src={image}></img>
          </div>
          <div className="courses-grid-item-title">{title}</div>
          <div className="courses-grid-item-content">
            <div className="courses-grid-item-starts">
              <span className="rating-star fas fa-star checked"></span>
              <span className="rating-star fas fa-star checked"></span>
              <span className="rating-star fas fa-star checked"></span>
              <span className="rating-star fas fa-star checked"></span>
              <span className="rating-star fas fa-star-half-stroke checked"></span>
              ({numberOfReview})
              <span className="ml-1">{numberOfStudent} Học viên</span>
            </div>
            <div className="course-tags">
              <span className="tag">#Khóa học online</span>
            </div>
          </div>
          <div className="courses-grid-item-pricing">
            <div className="course-prices">
              <span className="course-price">{price}</span>
              <span class="ml-1 course-listing-price">{listingPrice}</span>
              <span class="ml-1 badge badge-danger badge-lg">-{reduce}%</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}
