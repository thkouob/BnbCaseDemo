using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaseFor20150101.Models
{
    public class PlayerYlianWebSiteViewModel
    {
        public List<HeaderMenuDisPlay> HeaderMenuDisPlayList { get; set; }

        public TheNewsModel TheNewsModel { get; set; }
    }

    public class HeaderMenuDisPlay
    {
        public string Id { get; set; }

        public string PageName { get; set; }

        public string PageTitle { get; set; }

        public string Link { get; set; }

        public string PageTitleInChinese { get; set; }

        public string PageTitleInEnglish { get; set; }
    }
}