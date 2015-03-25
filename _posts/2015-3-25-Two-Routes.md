---
layout: post
title: Learn to Code by Making Visualizations
---

Making interactive visualizations is an exciting way to also learn computer programming. [That's what Obama did](http://qz.com/308904/heres-the-first-line-of-code-ever-written-by-a-us-president/). You can learn both programming and interactive visualization skills in two ways: (a) though web devevelopment and (b) through data analysis. 

<style>
	table {
		border: 1px solid lightgrey;
	}
	thead {
		  transform: translate(0,0.4em);
		font-size: 1.25em;
		font-weight: bold;
	}
	.route {
		font-size: 1em;
		font-style: italic;
		transform: translate(0, 0.7em);
	}

	td {
		/*padding: 50px;*/
		padding-left: 5px;
		padding-right: 5px;
		font-size: 0.7em;
	}
</style>

<table>
  <col style="width:50%">
  <col style="width:50%">
  <thead>
	  <tr>
	    <th>Description</th>
	    <th>Key learning outcomes</th>
	  </tr>
  </thead>
  <tbody>
  <tr>
  	<th colspan="2" class="route">Learning through web development</th>
  </tr>
  <tr>
    <td><ul>
    	<li>Use <a href="http://www.codecademy.com/tracks/javascript">JavaScript</a> and <a href="http://www.codecademy.com/tracks/web">HTML</a> and libraries such as <a href="https://github.com/mbostock/d3/wiki/Gallery">d3.js</a> to create highly customizable visualizations.</li>
    	<li>Learning to make even a simple chart can take time, but you develop core web and coding skills along the way.</li>
    </ul></td>
    <td><ul>
    	<li>Learn computer programming skills more generally.</li>
    	<li>Develop user design and web development experience.</li>
    	<li>Create novel and highly customizable visualizations.</li>
    </ul></td>
  </tr>

  <div style="transform: translate(0, -0.6em);">
  <tr>
  	<th colspan="2" class="route">Learning through data analysis environments</th>
  </tr>
  <tr>
    <td><ul>
    	<li>Use R or Python and associated packages such as <a href="http://ggvis.rstudio.com/">ggvis</a>, <a href="http://rcharts.io/">rCharts</a>, and <a href="http://shiny.rstudio.com/">Shiny</a>.</li>
    	<li>You can create sexy interactive graphics with just a few lines of codes, but can also be limited by the libraries' pre-existing graphics types (e.g., bar charts).</li>
    </ul></td>
    <td><ul>
    	<li>Create interactive graphics rapidly, but potentially with less customizability.</li>
    	<li>Learn the basics of the most important languages to the data science community (R & Python).</li>
    </ul></td>
  </tr>
  </div>
  </tbody>
</table>
<div style="font-size: 0.6em; margin-top: 0.5em;">DISCLAIMER: This distinction above is a helpful, but rough, one. For instance, JavaScript "wrapper" libraries like <a href="http://nvd3.org/">NVD3</a> and <a href="http://trifacta.github.io/vega/">Vega</a> more closely resemble R- and Python-based visualization packages than d3.js. R's <a href="http://shiny.rstudio.com/">Shiny package</a> further blurs this distinction.</div>

As detailed above, each route has its pros and cons, but **both involve learning some computer programming**. If you haven't programmed before, then great! Making visualizations is a fun way to learn. If you have programmed, then learning interactive visualization skills will be even easier. 

<div align="center">
	<img src="https://s-media-cache-ak0.pinimg.com/736x/27/b4/31/27b431f659ca49426d01a7be28f0091d.jpg" width="500"/>
	<a href="http://qz.com/308904/heres-the-first-line-of-code-ever-written-by-a-us-president/"><span style="font-size: 0.75em; display: block">Obama learns computer programming by making visualizations with JavaScript.</span></a>
</div>

When learning visualization skills, I found many great individual blog posts and tutorials, but struggled in finding a _curriculum_ that pieced together all of these learning resources. Hence, subsequent posts will take will take a more "meta" approach that will outline various learning pathways and direct you to relevant resources.

**My next post will focus on the web development**. In the meantime, here are some (_free!_) resources about learning more general web development skills:

 * [Codecademy](http://www.codecademy.com/): Provides interactive courses on [HTML/CSS](http://www.codecademy.com/tracks/web) and [JavaScript](http://www.codecademy.com/tracks/javascript) that (a) give some information (e.g., about HTML tags), (b) have you do an example exercise using that information, and (c) give you automated feedback about your code. I highly recommend it. You learn web development skills by actually practicing them, rather than just reading about them! 

 	* Codecademy's courses don't assume prior programming experience. However, as someone with prior programming experience, I still found them useful especially for learning new syntax. I was only mildly irrirated by the slow pace of the courses. But the somewhat slow pace suits a broad audience (e.g., they have over 24 million learners!). 
 	* SIDENOTE: JavaScript (JS) is easily the most important programming language for interactive data visualization. Nearly all interactive data visualizations use JS, even if you don't know it. Packages in R and Python can create JS code for you, allowing you to never touch JS. But not knowing JS will limit you if you want to create highly customizable interactive graphics. 

 * [CodeSchool's course on Chrome DevTools](https://www.codeschool.com/courses/discover-devtools): I highly highly highly recommend that you learn how to use a web development environment like [Chrome DevTools](https://developer.chrome.com/devtools) or [Firebug](http://getfirebug.com/) before getting deep into making visualizations. I didn't myself, which was a rookie mistake that I now regret. Like Codecademy's courses, [CodeSchool's course](https://www.codeschool.com/courses/discover-devtools) on DevTools is interactive and I also highly recommend it.
 * [Chapter 3 from Scott Murray's book](http://chimera.labs.oreilly.com/books/1230000000345/ch03.html): Provides a brief, highly accessible overview of core web development technologies. It's a fairly dense summary though, so I recommend using it as a "reference guide" for when you get deeper into more specific topics. 

Think I've missed a route for learning interactive data visualization? Tell me so in the comments!
