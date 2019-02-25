#################################################
## 8TH GRADE ALGEBRA: NATIONAL ACCESS ANALYSIS ##
## CREATE GRAPHS FOR DATA STORY #################
## jrickles 12.03.18 ############################
## revised 12.21.18 to better align with data story emphasis
## revised 01.18.18 to use latest definition of "large" districts
## revised 02.11.19 to use data from most recent district file

rm(list=ls())
setwd("H:/d-miller.github.io/alg8/integrated/R/")
setwd("~/Dropbox/Github/d-miller.github.io/alg8/integrated/R/")

Sys.setenv("plotly_username"="dimiller")
Sys.setenv("plotly_api_key"="Svn24TNgrUbdfm27g3Wq")

dta <- read.csv("11_datastory_viz_data_n10.csv")
db2 <- dta %>% filter(WB_n >=10 & is.na(mn_wbg_SEDA)==FALSE & top100==1)


com = function(x) format(x, big.mark=",")
tooltip = function(data) {
  x = paste0('
  <h3>', data$name, '</h3>
  <table><tbody>
    <tr><th>Group</th><th>Size</th><th>Rate</th></tr>
    <tr><td>Black</td><td>',com(data$BL08),'</td><td>',round(data$BL08_alg_p*100),'%</td></tr>
    <tr><td>White</td><td>',com(data$WH08),'</td><td>',round(data$WH08_alg_p*100),'%</td></tr>
  </tbody></table>
  ')
  
  #remove new line breaks and return
  gsub("\r?\n|\r", "", x)
}

########################
## 0. SET UP PROGRAM ##
########################

libs = c("foreign", "readstata13", "tidyverse", "readxl",
         "openxlsx", "lubridate", "stringr", "gridExtra",
         "prettyR", "lme4", "jtools", "plotly", "magick",
         "htmlwidgets")
for (lib in libs) {
  if (!lib %in% installed.packages()[,1]) install.packages(lib)
  library(lib, character.only = TRUE)
}



###########################################################################################
## 1. CREATE SCATTERPLOTS TO SHOW RELATIONSHIP BETWEEN TEST SCORE GAP AND ENROLLMENT GAP ##
###########################################################################################

#variables/name based on the gap
mGrp = list(
  WB = list(name="Black students", var = "BL08", color="#56B4E9"),
  WH = list(name="Hispanic students", var = "HI08", color="orange")
)

# points for top 200 districts
scat = function(data, xLim = c(-1.1, 6.1), yLim = c(-32, 52), apiName = NULL,
                n = "BL08", x = "mn_wbg_SEDA", y = "WB_diff", xTitle = "White - Black Test Score Gap",
                yTitle = "White - Black Enrollment Gap", gap = "WB", 
                trend = NULL) {
  
  #get variables/name based on the gap
  m = mGrp[[gap]]

  #font choices
  f <- list(
    family = '"lato",Arial,Helvetica,sans-serif',
    size = 18,
    color = "black"
  )
  f2 <- list(
    family = '"lato",Arial,Helvetica,sans-serif',
    size = 14,
    color = "black"
  )
  f3 <- list(
    family = '"lato",Arial,Helvetica,sans-serif',
    size = 12,
    color = "black"
  )
  
  #add annotations
  annotations = list(
    list(text = "??? White higher", x = .85, y = 2.7, showarrow = FALSE, xanchor="left", xref="paper", font = list(size = 13)), 
    list(text = "??? Black higher", x = .85, y = -2.1, showarrow = FALSE, xanchor="left", xref="paper", font = list(size = 13))
  )
  
  #axis options
  xaxis = list(range = xLim, showgrid = FALSE, zeroline = FALSE, nticks = 14, titlefont=f,
               #showspikes = TRUE, spikethickness = 1, spikedash	= "line",
               showline = TRUE, title = xTitle, ticks = "outside")
  yaxis = list(range = yLim, showgrid = FALSE, zeroline = TRUE, nticks = 14, titlefont=f,
               #showspikes = TRUE, spikethickness = 1, spikedash	= "line",
               showline = TRUE, title = yTitle, ticks = "outside", fixedrange=TRUE)
  
  # initiate a plotly object
  scat = plot_ly() 
    
    # points for regression line
    if (!is.null(trend)) {
      x.mod <- seq(xLim[1], xLim[2], length.out = 200)
      y.mod <- trend(x.mod)
    
      scat = scat %>%
        add_trace(scat, x = ~x.mod, y = ~y.mod*100,
              type = 'scatter', mode = 'lines',
              line = list(opacity = 0.5, color = "darkgrey", dash = "dot"),
              hoverinfo = 'text',
              hoverlabel = list(bgcolor = "white", font = f3),
              hovertext = ~c("Prediction line"),
              text = paste0("<text>Prediction line</text>"))
    }

    # add bubbles for top 100 districts
    scat = scat %>%
    add_trace(x = ~data[[x]], y = ~data[[y]]*100,
              size = ~sqrt(data[[n]]),
              type = 'scatter', mode = 'markers',
              marker = list(opacity = 0.5, color = m$color, 
                            sizemode = "diameter", sizeref=2,
                            line = list(color = "#222")),
              hoverinfo = 'text',
              hoverlabel = list(bgcolor = "white", font = f3),
              text = tooltip(data),
              #text = paste0("<text>", data$name, "</text>"),
              hovertext = ~paste("<b>", data$name, "</b>",
                            #"<br>Math test score gap:", format(round(x2,2),2),
                            #"<br>Enrollment gap:", format(round(y2,2),2),
                            "<br>", data[[m$var]], m$name,
                            "<br>", data$WH08, "White students")
    ) %>%
  
    #layout options (e.g., axes)
    layout(xaxis = xaxis,
           yaxis = yaxis,
           font = f2,
           annotations = annotations,
           margin = list(l = 10),
           showlegend = FALSE,
           xaxis=list(fixedrange=TRUE)) %>%
    
    #config options (e.g., customize modebar)
    config(displaylogo = FALSE, collaborate = FALSE,
           modeBarButtonsToRemove = list("lasso2d", "zoom2d", "hoverClosestCartesian","pan2d",
                                         "toggleSpikelines", "hoverCompareCartesian", "select2d", 
                                         "autoScale2d"))
  
  if (!is.null(apiName)) api_create(scat, filename = apiName)
  scat
}



## Create White-Black Scatterplot for Relationship Btw Test Gap and Enroll Gap

trend = function(x) .0196163 + .0575691*x
scat(db2, trend = trend, gap="WB", apiName = "WB_scat2")

#show segregation & access
# dta <- filter(read.csv("district.csv"), top100==1)
# scat(dta, x = "WB_dissim", y = "WB_access", xLim=c(0,1), yLim = c(-100,100))
