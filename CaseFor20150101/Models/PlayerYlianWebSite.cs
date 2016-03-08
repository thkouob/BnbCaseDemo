using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace CaseFor20150101.Models
{
    public class PlayerYlianWebSite
    {
        public string playerYlianWebSiteXmlPath;

        public XDocument PlayerYlianWebSiteXmldoc { get; set; }

        public PlayerYlianWebSite()
        {
            playerYlianWebSiteXmlPath = HttpContext.Current.Server.MapPath("~/App_Data/PlayerYlianWebSiteConfig.xml");
            PlayerYlianWebSiteXmldoc = XDocument.Load(playerYlianWebSiteXmlPath);
        }

        public void saveNewsXml()
        {
            PlayerYlianWebSiteXmldoc.Save(playerYlianWebSiteXmlPath);
        }
    }
}