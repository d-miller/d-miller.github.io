#set working directory and load data
rm(list=ls())
setwd("~/Dropbox/Github/d-miller.github.io/assets/aewrn224/other/")


#graph results
graph <- function(ggvisObj, yTitle="", yLim=NULL) {
  if (!is.null(yLim)) ggvisObj <- ggvisObj %>% scale_numeric("y",  domain=yLim, override=TRUE)
  return (ggvisObj %>% 
            layer_paths(  ~year, ~nation,  stroke:="black", strokeWidth:=3) %>%
            layer_paths(  ~year, ~elite, stroke:="rgb(178,24,43)",  strokeWidth:=3) %>%
            layer_text(2000, ~nation[1]+1,   text := "National average",   fontSize:=15, font:="Arial", fill:="black") %>%
            layer_text(2000, ~elite[1]+0.8, text := "Elite programs", fontSize:=15, font:="Arial", fill:="rgb(178,24,43)") %>%
            layer_text(2013, ~nation[14]-.6,   text := "14%",   fontSize:=15, font:="Arial", fill:="black") %>%
            layer_text(2013, ~elite[14]-.4, text := "17%", fontSize:=15, font:="Arial", fill:="rgb(178,24,43)") %>%
            add_axis("x", title="Year Earned Bachelor's Degree", title_offset=50, 
                     grid=FALSE, tick_size_end=0,
                     properties = axis_props(title = list(fontSize=17),
                                             labels = list(fontSize=13))) %>%
            add_axis("y", title=yTitle, title_offset=80, grid=FALSE, 
                     tick_size_end=0, ticks=7, properties = axis_props(title = list(fontSize=17, font="Arial"),
                                                                       labels = list(fontSize=13))) %>%
            add_axis("x", orient = "top", title="", grid=FALSE, tick_size_major=0, 
                     properties = axis_props(labels=list(fontSize=0))) %>%
            add_axis("y", orient = "right", title="", grid=FALSE, ticks=0, tick_size_major=0))
}

########## WEBCASPAR ##############
prctF <- read.csv("top25time.csv")

ggvis(prctF) %>% set_options(width=325, height=250, resizable = FALSE) %>%
  graph(yTitle="Women's Share of Computer Science Bachelor's Degrees (%)", yLim=c(0,30))


