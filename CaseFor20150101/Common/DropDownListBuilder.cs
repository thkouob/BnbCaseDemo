using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CaseFor20150101.Common
{
	public class DropDownListBuilder
	{
		public static List<SelectListItem> GetRoomNumberList()
		{
			List<SelectListItem> items = new List<SelectListItem>()
			{
				new SelectListItem { Value = "102", Text = "102房" },
				new SelectListItem { Value = "202", Text = "202房" },
				new SelectListItem { Value = "302", Text = "302房" },
				new SelectListItem { Value = "305", Text = "305房" },
				new SelectListItem { Value = "206", Text = "206房" },
				new SelectListItem { Value = "108", Text = "108房" }
			};

			return items;
		}

		public static List<SelectListItem> GetNewsNumberList()
		{
			List<SelectListItem> items = new List<SelectListItem>()
			{
				new SelectListItem { Value = "0", Text = "第1則新消息" },
				new SelectListItem { Value = "1", Text = "第2則新消息" }
			};

			return items;
		}
	}
}