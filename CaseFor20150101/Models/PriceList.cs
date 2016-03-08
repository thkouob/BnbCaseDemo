using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace CaseFor20150101.Models
{
    public class PriceList
    {
        public string priceListXmlPath;

        public XDocument PriceListXmldoc { get; set; }
        
        public PriceList() 
        {
            priceListXmlPath = HttpContext.Current.Server.MapPath("~/App_Data/RoomPrice.xml");
            PriceListXmldoc = XDocument.Load(priceListXmlPath);
        }

        public void saveNewsXml()
        {
            PriceListXmldoc.Save(priceListXmlPath);
        }

        public string findLastId(XElement xe)
        {
            if (xe.Elements("Room").Count() != 0)
                return (Convert.ToInt32(xe.Elements("Room").Last().Attribute("id").Value) + 1).ToString();
            else
                return "0";
        }
    }
}