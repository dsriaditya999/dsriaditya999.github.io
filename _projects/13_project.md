---
layout: page
title: Fire Alarm
description:
img: assets/img/publication_preview/fire_alarm.png
importance: 13
abstract: The Fire Alarm with Intensity Meter project is an innovative analog electronics application designed to detect and indicate the presence and intensity of fire using temperature changes. The system employs an NTC (Negative Temperature Coefficient) thermistor to sense temperature variations, where its resistance decreases as temperature increases. When the temperature exceeds 50°C, the output from an IC741 comparator triggers a 555 Timer configured as an astable multivibrator, activating an alarm. Simultaneously, a series of LED indicators, driven by additional IC741 comparators, display the fire's intensity by lighting up progressively with each 10°C increase. The system is powered by multiple DC supplies and includes components like resistors, capacitors, and a speaker for alarm output. This project effectively demonstrates the integration of temperature sensing, signal processing, and user notification in a practical fire alarm system, providing a comprehensive solution for early fire detection and intensity measurement.
video: /assets/video/fire_alarm.mp4
pdf: /assets/pdf/fire_alarm.pdf
category: Undergraduate Projects
---
The Fire Alarm with Intensity Meter project is an innovative analog electronics application designed to detect and indicate the presence and intensity of fire using temperature changes. The system employs an NTC (Negative Temperature Coefficient) thermistor to sense temperature variations, where its resistance decreases as temperature increases. When the temperature exceeds 50°C, the output from an IC741 comparator triggers a 555 Timer configured as an astable multivibrator, activating an alarm. Simultaneously, a series of LED indicators, driven by additional IC741 comparators, display the fire's intensity by lighting up progressively with each 10°C increase. The system is powered by multiple DC supplies and includes components like resistors, capacitors, and a speaker for alarm output. This project effectively demonstrates the integration of temperature sensing, signal processing, and user notification in a practical fire alarm system, providing a comprehensive solution for early fire detection and intensity measurement.

A brief report of the project can be found <a href="{{ site.url }}{{ site.baseurl }}/assets/pdf/fire_alarm.pdf" target="_blank" rel="noreferrer noopener">here</a>. 



<div class="caption">
    Video Demo of the Project
</div>
<div class="row justify-content-center">
    <div class="col-sm mt-3 mt-md-0 d-flex justify-content-center">
        {% include video.liquid path="assets/video/fire_alarm.mp4" class="img-fluid rounded z-depth-1" controls=true %}
    </div>
</div>
