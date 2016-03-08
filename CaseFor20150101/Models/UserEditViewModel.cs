using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CaseFor20150101.Models
{
    public class UserEditViewModel
    {
        public List<RoomPrice> RoomPriceList { get; set; }

        public List<TheNews> TheNewsModelList { get; set; }

        public string NewsId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string RoomsId { get; set; }

        public string WorkDayPrice { get; set; }

        public string WeekEndPrice { get; set; }

        public string HoildayPrice { get; set; }

        public List<SelectListItem> NewsNumberList { get; set; }

        public List<SelectListItem> RoomNumberList { get; set; }

        public int Action { get; set; }
    }
}