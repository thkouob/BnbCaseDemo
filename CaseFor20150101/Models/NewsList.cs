using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.Linq;

namespace CaseFor20150101.Models
{
    public class NewsList
    {
        public string newsListXmlPath;

        public XDocument NewsListXmldoc { get; set; }

        public NewsList() 
        {
            newsListXmlPath = HttpContext.Current.Server.MapPath("~/App_Data/NewInfo.xml");
            NewsListXmldoc = XDocument.Load(newsListXmlPath);
        }

        public void saveNewsXml() 
        {
            NewsListXmldoc.Save(newsListXmlPath);
        }

        public string findLastId(XElement xe) 
        {
            if (xe.Elements("New").Count() != 0)
                return (Convert.ToInt32(xe.Elements("New").Last().Attribute("id").Value) + 1).ToString();
            else
                return "0";
        }


    }
}