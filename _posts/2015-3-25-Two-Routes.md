---
layout: post
title: Learn Programming by Making Visualizations
---

Making interactive visualizations is an exciting way to also learn computer programming. [That's what Obama did](http://qz.com/308904/heres-the-first-line-of-code-ever-written-by-a-us-president/). You can learn both programming and visualization skills in two ways: (a) though web devevelopment and (b) through data analysis. 

<style>
	thead {
		font-size: 1.5em;
		font-weight: bold;
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
  <tr>
  	<th colspan="2">Learning through web development</th>
  </tr>
  <tr>
    <td><ul>
    	<li>Use core web languages like JavaScript and HTML and libraries such as d3.js to create highly customizable visualizations.</li>
    	<li>Learning to create even a simple histogram can take time, but you develop invaluable web and programming skills along the way.</li>
    </ul></td>
    <td><ul>
    	<li>Learn computer programming skills more generally.</li>
    	<li>Develop user design and web development experience.</li>
    	<li>Create novel and highly customizable visualizations.</li>
    </ul></td>
  </tr>

  <tr>
  	<th colspan="2">Learning through data analysis</th>
  </tr>
  <tr>
    <td><ul>
    	<li>Use R or Python and packages such as ggvis and rCharts to create visualizations that are less customizable, but still cover many common uses.</li>
    	<li>You can create sexy interactive graphics with just a few lines of codes, but will be limited by the libraries' pre-existing chart types (e.g., bar charts).</li>
    </ul></td>
    <td><ul>
    	<li>Create interactive graphics rapidly with less concern for customizability.</li>
    	<li>Learn the basics of the most important languages to the data science community (R & Python).</li>
    	<li>Quickly extend existing R/Python skills (if you already know R/Python).</li>
    </ul></td>
  </th>
</table>

As detailed above, each route has its pros and cons, but both involve learning some computer programming. If you haven't programmed before, then great! Making visualizations is a fun way to learn. If you have programmed, then making visualizations will extend both your programming and communication skills. 

<div align="center">
	<img src="https://s-media-cache-ak0.pinimg.com/736x/27/b4/31/27b431f659ca49426d01a7be28f0091d.jpg" width="500"/>
	<a href="http://qz.com/308904/heres-the-first-line-of-code-ever-written-by-a-us-president/"><span style="font-size: 0.75em; display: block">Obama learns computer programming by making visualizations with JavaScript.</span></a>
</div>

When learning visualization skills, I found many great individual blog posts and tutorials, but struggled in finding a _curriculum_ that pieced together all of these learning resources. Hence, my blog will take will take a more "meta" approach that will outline various learning pathways and direct you to relevant resources.

My next post will focus on the first learning pathway: learning interactive visualization through web development. In the meantime, here are some (_free!_) resources about learning more general web development skills:

 * [Codecademy](http://www.codecademy.com/): Provides interactive courses on [HTML/CSS](http://www.codecademy.com/tracks/web) and [JavaScript](http://www.codecademy.com/tracks/javascript) that (a) give some information (e.g., about HTML tags), (b) have you do an example exercise using that information, and (c) give you automated feedback about your code. I highly recommend it. You learn web development skills by actually practicing them, rather than just reading about them! 

 	* Codecademy's courses don't assume prior programming experience. However, as someone with prior programming experience, I still found them useful especially for learning new syntax. I was only mildly irrirated by the slow pace of the courses. But the somewhat slow pace suits a broad audience (e.g., they have over 24 million learners!). 
 	* SIDENOTE: JavaScript (JS) is easily the most important programming language for interactive data visualization. Nearly all interactive data visualizations use JS, even if you don't know it. Packages in R and Python can create JS code for you, allowing you to never touch JS. But not knowing JS will limit you if you want to create highly customizable interactive graphics. 

 * [CodeSchool's course on Chrome DevTools](https://www.codeschool.com/courses/discover-devtools): I highly highly highly recommend that you learn how to use a web development environment like [Chrome DevTools](https://developer.chrome.com/devtools) or [Firebug](http://getfirebug.com/) before getting deep into making visualizations. I didn't myself, which was a rookie mistake that I now regret. Like Codecademy's courses, [CodeSchool's course](https://www.codeschool.com/courses/discover-devtools) on DevTools is interactive and I also highly recommend it.
 * [Chapter 3 from Scott Murray's book](http://chimera.labs.oreilly.com/books/1230000000345/ch03.html): Provides a brief, highly accessible overview of core web development technologies. It's a fairly dense summary though, so I recommend using it as a "reference guide" for when you get deeper into more specific topics. 

Think I've missed a route for learning interactive data visualization? Tell me so in the comments!
