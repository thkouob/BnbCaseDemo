using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Linq;
using CaseFor20150101.Models;
using System.Threading.Tasks;
using CaseFor20150101.Common;

namespace CaseFor20150101.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult IndexPage() 
        {
            PlayerYlianWebSite playerYlianWebSite = new PlayerYlianWebSite();


            NewsList newslist = new NewsList();
            var viewModel = new PlayerYlianWebSiteViewModel();
            XElement xe = newslist.NewsListXmldoc.Root;
            List<TheNews> infoList =
                (from elements in xe.Elements()
                 select new TheNews
                {
                    Title = elements.Element("NewTitle").Value,
                    Content = elements.Element("NewContent").Value,
                    Id = elements.Attribute("id").Value
                }).ToList();
            viewModel.TheNewsModel.TheNewsList = infoList;

            return View(viewModel);
        }

        public ActionResult ContentPage()
        {
            PriceList pricelist = new PriceList();
            var viewModel = new ThePriceModel();
            XElement xs = pricelist.PriceListXmldoc.Root;
            List<RoomPrice> priceList =
                (from elements in xs.Elements()
                 select new RoomPrice
                 {
                     WorkDayPrice = elements.Element("WorkDayPrice").Value,
                     WeekEndPrice = elements.Element("WeekEndPrice").Value,
                     HoildayPrice = elements.Element("HoildayPrice").Value,
                     Id = elements.Attribute("id").Value
                 }).ToList();

            viewModel.RoomPriceList = priceList;

            return View(viewModel);
        }

        public async Task<ActionResult> UserEdit()
        {
            var viewModel = new UserEditViewModel();
            viewModel.NewsNumberList = DropDownListBuilder.GetNewsNumberList();
            viewModel.RoomNumberList = DropDownListBuilder.GetRoomNumberList();

            return View(viewModel);
        }

        [HttpPost]
        public async Task<ActionResult> UserEdit(UserEditViewModel model)
        {
            if (model.Action == 1) 
            { 
                bool message_id_check;
                
                NewsList newslist = new NewsList();
                XElement xe = newslist.NewsListXmldoc.Root;
                var message_el = from el in xe.Elements("New")
                                 where el.Attribute("id").Value == model.NewsId
                                 select el;

                message_id_check = message_el.ToList().Count != 0;
                
                if (message_id_check)
                {
                    //Modify
                    message_el.First().Element("NewTitle").Value = model.Title;
                    message_el.First().Element("NewContent").Value = model.Content;
                    newslist.saveNewsXml();
                }
            }

            if (model.Action == 2)
            {
                bool price_id_check;

                PriceList priceList = new PriceList();
                XElement xs = priceList.PriceListXmldoc.Root;
                var message_ed = from el in xs.Elements("Room")
                                 where el.Attribute("id").Value == model.RoomsId
                                 select el;

                price_id_check = message_ed.ToList().Count != 0;

                if (price_id_check)
                {
                    //Modify
                    message_ed.First().Element("WorkDayPrice").Value = model.WorkDayPrice;
                    message_ed.First().Element("WeekEndPrice").Value = model.WeekEndPrice;
                    message_ed.First().Element("HoildayPrice").Value = model.HoildayPrice;
                    priceList.saveNewsXml();
                }
            }

            return RedirectToAction("UserEdit");
        }


        public ActionResult SpotPage()
        {
            return View();
        }

        public ActionResult Temp2()
        {
            return View();
        }


    }
}