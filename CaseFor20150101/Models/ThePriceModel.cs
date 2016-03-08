using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaseFor20150101.Models
{
    public class ThePriceModel
    {
        public List<RoomPrice> RoomPriceList { get; set; }
    }

    public class RoomPrice
    {
        public string Id { get; set; }

        public string WorkDayPrice { get; set; }

        public string WeekEndPrice { get; set; }

        public string HoildayPrice { get; set; }
    }
}