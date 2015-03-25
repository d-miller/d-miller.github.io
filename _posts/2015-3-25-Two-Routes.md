---
layout: post
title: Learn Programming by Making Visualizations
---

Making interactive visualizations is an exciting way to also learn computer programming. [That's what Obama did](http://qz.com/308904/heres-the-first-line-of-code-ever-written-by-a-us-president/). You can learn both programming and visualization skills in two ways: (a) though web devevelopment and (b) through data analysis. 

1. Web development: Learn core web languages like JavaScript and HTML to use libraries such as d3.js to create highly customizable visualizations.
2. Data analysis: Use packages in R and Python to create visualizations that are less customizable, but still cover many common uses. 

Table of pros and cons here:
Web development: Highly customizable, 
Data analysis: 

<table>
  <tr>
    <th>Learning pathway</th>
    <th>Description</th>
    <th>Who will be most interested</th>
  </tr>
  <tr>
    <td>Web development</td>
    <td>
    <p>Learn core web languages like JavaScript and HTML to use libraries such as d3.js to   create highly customizable visualizations.</p>
    <p>Learning to create even a simple histogram can take time, but you develop invaluable web and programming skills along the way. The potential for creating new types of graphics is almost limitless. Data might need to be preprocessed or analyzed first in R/Python.</p>
    </td>
    <td>People aiming to…
    	<ul>
    		<li>learn computer programming skills more generally</li>
    		<li>develop user design and web development experience</li>
    		<li>create novel and highly customizable visualizations</li>
    	</ul>
	</td>
  </tr>
  <tr>
    <td>Data analysis</td>
    <td>
    	<p>Use packages such as ggvis and rCharts to create visualizations in R and Python that are less customizable, but still cover many common uses.</p>
    	<p>You can create sexy interactive graphics with just a few lines of codes, but will be limited by the libraries' pre-existing chart types (e.g., bar charts). However, the much quicker development time is attractive, especially if you already know R/Python.</p>
    </td>
    <td>People aiming to…
    	<ul>
    		<li>create interactive graphics rapidly with less concern for customizability</li>
    		<li>learn the most important languages to the data science community (R & Python)</li>
    		<li>extend existing familiarity with R/Python</li>
    	</ul>
    </td>
  </th>
</table>

Columns: description, flexibility, development time, learning time, what skills you will pick up, core technologies/languages.


As detailed above, each route has its pros and cons, but both involve learning some computer programming. If you haven't programmed before, then great! Making visualizations is a fun way to learn. If you have programmed, then making visualizations will extend both your programming and communication skills. 

<img src="https://s-media-cache-ak0.pinimg.com/736x/27/b4/31/27b431f659ca49426d01a7be28f0091d.jpg" width="800"/>
<a href="http://qz.com/308904/heres-the-first-line-of-code-ever-written-by-a-us-president/"><span style="font-size: 0.75em; display: block">Obama learns computer programming by making visualizations with JavaScript.</span></a>

When learning visualization skills, I found many great individual blog posts and tutorials, but struggled in finding a _curriculum_ that pieced together all of these learning resources. Hence, my blog will take will take a more "meta" approach that will outline various learning pathways and direct you to relevant resources.

My next post will focus on the first learning pathway: learning visualization through web development. In the meantime, here are some (_free!_) resources about learning more general web development skills:
 * [Codecademy](http://www.codecademy.com/): Provides interactive courses on [HTML/CSS](http://www.codecademy.com/tracks/web) and [JavaScript](http://www.codecademy.com/tracks/javascript) that (a) give some information (e.g., about HTML tags), (b) have you do an example exercise using that information, and (c) give you automated feedback about your code. I highly recommend it. You learn web development skills by actually practicing them, rather than just reading about them! 
 	* Codecademy's courses don't assume prior programming experience. However, as someone with prior programming experience, I still found them useful. Especially when learning the syntax of new languages like JavaScript. I was only mildly irrirated by the slow pace of the courses. But the somewhat slow pace suits a broad audience (e.g., they have over 24 million learners!). 
 	* Sidenote: JavaScript (JS) is easily the most important programming language for interactive data visualization. Basically, nearly all interactive data visualizations use JS, even if you don't know it. Packages in R and Python can create JS code for you, allowing you to never touch JS. But not knowing JS will limit you if you want to create highly customizable interactive visualizations. 

 * [CodeSchool's course on Chrome DevTools](https://www.codeschool.com/courses/discover-devtools): I highly highly highly recommend that you learn how to use a web development environment like [Chrome DevTools](https://developer.chrome.com/devtools) or [Firebug](http://getfirebug.com/) before getting deep into making visualizations. I didn't myself, which was a rookie mistake that I now regret. Like Codecademy's courses, [CodeSchool's course](https://www.codeschool.com/courses/discover-devtools) on DevTools is interactive and I also highly recommend it.
 * [Chapter 3 from Scott Murray's book](http://chimera.labs.oreilly.com/books/1230000000345/ch03.html): Provides a brief, highly accessible overview of core web development technologies. It's a fairly dense summary though, so I recommend using it as a "reference guide" for when you get deeper into more specific topics. 

Think I've missed a route for learning interactive data visualization? Tell me so in the comments!
