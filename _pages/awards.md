---
layout: page
permalink: /awards/
title: awards
nav_order: 3
description:
nav: true
---
<style>
.awards-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.award-item {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 0;
  margin-bottom: 20px;
}

.award-item .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.award-item .plus {
  font-size: 1.5em;
  transition: transform 0.3s ease, font-size 0.3s ease;
  margin-right: 10px;
  font-weight: bold;
  position: relative;
}

.award-item .plus::after {
  content: "";
  position: absolute;
  top: -20px;
  left: -10px;
  font-size: 0.8em;
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
}

.award-item .header:hover .plus {
  transform: scale(1.2);
  font-size: 1.8em;
}

.award-item .header:hover .plus::after {
  opacity: 1;
}

.award-item .title-container {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.award-item .title {
  font-size: 1.1em;
  margin-left: 10px; /* Adjust the space between plus and text */
}

.award-item .year {
  font-size: 1.5em;
  color: rgba(224, 224, 224, 0.9); /* More translucent year */
  text-align: center;
  flex-basis: 100px;
  flex-shrink: 0;
}

.award-item .more-info {
  display: none;
  margin-top: 10px;
  text-align: center;
}

.award-item .more-info .images-container {
  display: flex;
  justify-content: space-between;
  gap: 10px; /* Space between images */
  flex-wrap: wrap;
}

.award-item .more-info img {
  flex-grow: 1;
  max-width: calc(33.33% - 10px); /* Allow three images to fit with space */
  height: auto;
  margin-top: 10px;
  object-fit: contain;
}

/* Special handling for a single image */
.award-item .more-info .images-container.single-image img {
  max-width: 75%; /* Use 75% of the container's width */
  margin: 0 auto; /* Center the image */
}

/* Rotate plus sign to a minus when expanded */
.award-item.expanded .plus {
  content: "-";
}

/* Custom styling for the DoS award to prevent cursor change */
.award-item.no-click .header {
  cursor: default;
}
</style>

<meta name="description" content="Travel Fellowship, Best Paper Award, Outstanding Academic Achievement, Golden Key Society" />

<div class="awards-container">
  <!-- INAE Award -->
  <div class="award-item">
    <div class="header">
      <div class="title-container">
        <div class="plus">+</div>
        <div class="title"><a href="https://www.inae.in" target="_blank">INAE</a> Innovative Student Projects Award</div>
      </div>
      <div class="year">2022</div>
    </div>
    <div class="more-info">
      <p>Awarded based on my Undergraduate Research Thesis on Autonomous Robotic Grasping.</p>
      <div class="images-container">
        <img src="/assets/img/inae1.png" alt="INAE Award Image 1">
        <img src="/assets/img/inae1.png" alt="INAE Award Image 2">
      </div>
    </div>
  </div>
  
  <!-- Institute Gold Medal -->
  <div class="award-item">
    <div class="header">
      <div class="title-container">
        <div class="plus">+</div>
        <div class="title"> Institute Gold Medal of Academic Excellence (Undergraduate) - <a href="https://www.iist.ac.in/academics/convocation" target="_blank">IIST</a></div>
      </div>
      <div class="year">2022</div>
    </div>
    <div class="more-info">
      <p>Awarded to the undergraduate student with outstanding overall academic performance.</p>
      <div class="images-container single-image">
        <img src="/assets/img/img6.png" alt="IIST Gold Medal Image">
      </div>
    </div>
  </div>
  
  <!-- Dr. Satish Dhawan Fellowship -->
  <div class="award-item">
    <div class="header">
      <div class="title-container">
        <div class="plus">+</div>
        <div class="title"> Dr. Satish Dhawan Fellowship - Department of Space (DoS), Govt. of India </div>
      </div>
      <div class="year">2022</div>
    </div>
    <div class="more-info">
      <p>Earned a fully funded opportunity to pursue Masters in Electrical Engineering at the prestigious Caltech.</p>
      <div class="images-container single-image">
        <img src="/assets/img/caltech.png" alt="Satish Dhawan Fellowship Image">
      </div>
    </div>
  </div>
  
  <!-- DoS Semester Fee Financial Assistance -->
  <div class="award-item no-click">
    <div class="header">
      <div class="title-container">
        <div class="plus"></div>
        <div class="title">DoS Semester Fee Financial Assistance and Book Grant for Academic Excellence</div>
      </div>
      <div class="year">2018-22</div>
    </div>
  </div>

  <!-- FIITJEE Award -->
  <div class="award-item">
    <div class="header">
      <div class="title-container">
        <div class="plus">+</div>
        <div class="title">Highest Score in TS Intermediate Examination - <a href="https://cbse.fiitjee.com/2018result/Telangana2018.aspx" target="_blank">FIITJEE</a></div>
      </div>
      <div class="year">2018</div>
    </div>
    <div class="more-info">
      <p>Scored the highest marks in my institution in the Telangana State Board Intermediate Examination.</p>
      <div class="images-container single-image">
        <img src="/assets/img/tsbie.png" alt="FIITJEE Award Image">
      </div>
    </div>
  </div>

  <!-- Annual Proficiency Prize -->
  <div class="award-item">
    <div class="header">
      <div class="title-container">
        <div class="plus">+</div>
        <div class="title">Annual Proficiency Prize for Best Academic Performance - <a href="http://howardinstitutions.org" target="_blank">Howard Public School</a></div>
      </div>
      <div class="year">2011-16</div>
    </div>
    <div class="more-info">
      <p>5 times winner of annual proficiency prize for best academic performance in school, 2011-2016.</p>
      <div class="images-container">
        <img src="/assets/img/ann1.png" alt="Annual Proficiency Prize Image 1">
        <img src="/assets/img/ann2.png" alt="Annual Proficiency Prize Image 2">
        <img src="/assets/img/ann3.png" alt="Annual Proficiency Prize Image 3">
      </div>
    </div>
  </div>
</div>

<script>
document.querySelectorAll('.award-item .header').forEach(item => {
  item.addEventListener('click', function() {
    const awardItem = this.parentElement;
    const moreInfo = this.nextElementSibling;
    const plus = this.querySelector('.plus');

    if (moreInfo.style.display === "none" || moreInfo.style.display === "") {
      moreInfo.style.display = "block";
      awardItem.classList.add('expanded');
      plus.textContent = "-";
    } else {
      moreInfo.style.display = "none";
      awardItem.classList.remove('expanded');
      plus.textContent = "+";
    }
  });
});
</script>
