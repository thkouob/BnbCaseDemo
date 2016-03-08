using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaseFor20150101.Models
{
    public class TheNewsModel
    {
        public List<TheNews> TheNewsList { get; set; }
    }
    
    public class TheNews
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public string Id { get; set; }
    }
}