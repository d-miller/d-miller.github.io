---
layout: post
title: Amplify Your Data Using Interactive Graphics
---

Want to use interactive graphics to help amplify your research? This post talks about how to do that, using [my new international research](http://d-miller.github.io/assets/MillerEaglyLinn2015.pdf) as an example. Most recently, [_Science_](http://news.sciencemag.org/social-sciences/2015/05/science-still-seen-male-profession-according-international-study-gender-bias) mentioned the interactive table I created for that study.

## Three examples of interactive graphics in the news

This post aims to reach both people looking to learn more about (a) interactive graphics and (b) gender diversity in science. I discuss three examples here, and then later talk about how I made the table for [my new international study](http://d-miller.github.io/assets/MillerEaglyLinn2015.pdf) on gender-science stereotypes [click here to jump to the table]. 

### Example #1: Interactive table [D3.js]

My latest research finds that stereotypes associating science with men prevail worldwide, even in supposedly “gender-equal” nations like Denmark and Norway ([PDF](http://d-miller.github.io/assets/MillerEaglyLinn2015.pdf); [press release](http://www.northwestern.edu/newscenter/stories/2015/05/gender-science-stereotypes-persist-across-the-world.html)). I created an interactive table using the JavaScript library D3.js to show what nations have the strongest stereotypes. 

[[RELATED POST: 5 Reasons to Learn D3.js]](http://d-miller.github.io/Why-Learn-D3/)

You might be surprised to learn what nation had the strongest stereotypes out of all 66 nations studied! [jump to table]

I love that the table is so simple (just one interactive control!), yet directly influenced news coverage in [_Pacific Standard_](http://www.psmag.com/health-and-behavior/when-it-comes-to-female-scientists-seeing-is-believing), [_Science_](http://news.sciencemag.org/social-sciences/2015/05/science-still-seen-male-profession-according-international-study-gender-bias), [_U.S. News_](http://www.usnews.com/news/blogs/data-mine/2015/05/18/stem-gender-stereotypes-common-across-the-world), and [_Yahoo News_](http://news.yahoo.com/gender-science-stereotype-strongest-holland-082246004.html). This example demonstrates an important point: simple graphics can sometimes present information more effectively than graphics with many distracting bells and whistles.  

In this case, the table helped provide reporters with information about international rankings and statistics. Those reporters did not directly contact me about such details. In fact, only one of those outlets interviewed me on the phone, but we didn’t talk about the detailed rankings discussed in the [final news piece](http://news.sciencemag.org/social-sciences/2015/05/science-still-seen-male-profession-according-international-study-gender-bias).

So how did the reporters know about my website? [Northwestern University’s press release](http://www.northwestern.edu/newscenter/stories/2015/05/gender-science-stereotypes-persist-across-the-world.html) explicitly mentioned it. That leads to another tip: if you’ve made awesome graphics for your research, work with your university’s or company’s public relations office to promote it.

<script src="../assets/test/lib/d3.v3.min.js"></script>
<link rel="stylesheet" href="../assets/test/styles/styles.css">

<div id="table" style="padding-top: 0px;">
  <div id="titleCustom">
    <h1><strong>Global Gender-Science Stereotypes</strong></h1>
    <h3>(Click header labels to resort)</h3>
  </div>
  <div class="top25" style="text-align: center;"></div>
  <script src="../assets/test/js/top25.js"></script>
</div>
