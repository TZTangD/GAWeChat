using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Abp.Authorization;
using HC.WeChat.Configuration;
using HC.WeChat.Controllers;
using HC.WeChat.Dto;
using HC.WeChat.Models.WeChat;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using NPOI.HSSF.Util;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;

namespace HC.WeChat.Web.Host.Controllers
{
    public class WeChatFileController : WeChatControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public WeChatFileController(IHostingEnvironment hostingEnvironment)
        {
            this._hostingEnvironment = hostingEnvironment;
        }

        public IActionResult Index()
        {
            return View();
        }

        [RequestFormSizeLimit(valueCountLimit: 2147483647)]
        [HttpPost]
        public async Task<IActionResult> BanquetPhotoSave(IFormFile imgs)
        {
            var date = Request;
            var files = Request.Form.Files;
            long size = files.Sum(f => f.Length);
            string webRootPath = _hostingEnvironment.WebRootPath;
            string contentRootPath = _hostingEnvironment.ContentRootPath;
            WeChatFile result = new WeChatFile();
            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {

                    string fileExt = Path.GetExtension(formFile.FileName); //文件扩展名，不含“.”
                    long fileSize = formFile.Length; //获得文件大小，以字节为单位
                    result.Uid = Guid.NewGuid().ToString();
                    string newFileName = result.Uid + "." + fileExt; //随机生成新的文件名
                    var fileDire = webRootPath + "/upload/BanquetPhotos/";
                    if (!Directory.Exists(fileDire))
                    {
                        Directory.CreateDirectory(fileDire);
                    }

                    var filePath = fileDire + newFileName;

                    result.Url = filePath;
                    result.Name = newFileName;

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> BanquetPhotoSaveBase64([FromBody]JObject data)
        {
            WeChatFileInput file = data.ToObject<WeChatFileInput>();
            var imageBase64 = file.thumbUrl;

            if (!string.IsNullOrWhiteSpace(imageBase64))
            {
                var reg = new Regex("data:image/(.*);base64,");
                imageBase64 = reg.Replace(imageBase64, "");
                byte[] imageByte = Convert.FromBase64String(imageBase64);
                var memorystream = new MemoryStream(imageByte);

                WeChatFile result = new WeChatFile();
                string webRootPath = _hostingEnvironment.WebRootPath;
                string contentRootPath = _hostingEnvironment.ContentRootPath;
                string fileExt = Path.GetExtension(file.name); //文件扩展名，不含“.”
                string newFileName = file.uid + "." + fileExt; //随机生成新的文件名
                var fileDire = webRootPath + "/upload/BanquetPhotos/";
                if (!Directory.Exists(fileDire))
                {
                    Directory.CreateDirectory(fileDire);
                }

                var filePath = fileDire + newFileName;

                result.Url = filePath;
                result.Name = newFileName;

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await memorystream.CopyToAsync(stream);
                }

                return Json(new APIResultDto() { Code = 701, Msg = "上传数据成功", Data = result });
            }
            return Json(new APIResultDto() { Code = 701, Msg = "上传数据不能为空" });
        }
        [AbpAllowAnonymous]
        [RequestFormSizeLimit(valueCountLimit: 2147483647)]
        [HttpPost]
        public async Task<IActionResult> UploadFile()
        {
            var data = Request.Form.Files["imgs"];
            string webRootPath = _hostingEnvironment.WebRootPath;
            string contentRootPath = _hostingEnvironment.ContentRootPath;
            var fileDire = webRootPath + "/upload/BanquetPhotos/";
            var filePath = fileDire + "a.jpg";
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await data.CopyToAsync(stream);
            }
            return Ok(new { msg = "OK"});
        }

        [AbpAllowAnonymous]
        public FileResult ExportExcel()
        {
            //var newFile = @"newbook.core.xlsx";

            //using (var fs = new FileStream(newFile, FileMode.Create, FileAccess.Write))
            using (var fs = new MemoryStream())
            {
                IWorkbook workbook = new XSSFWorkbook();
                ISheet sheet1 = workbook.CreateSheet("Sheet1");
                sheet1.AddMergedRegion(new CellRangeAddress(0, 0, 0, 10));
                //ICreationHelper cH = wb.GetCreationHelper();
                var rowIndex = 0;
                IRow row = sheet1.CreateRow(rowIndex);
                row.Height = 30 * 80;
                var cell = row.CreateCell(0);
                var font = workbook.CreateFont();
                font.IsBold = true;
                font.Color = HSSFColor.DarkBlue.Index2;
                cell.CellStyle.SetFont(font);

                cell.SetCellValue("A very long piece of text that I want to auto-fit innit, yeah. Although if it gets really, really long it'll probably start messing up more.");
                sheet1.AutoSizeColumn(0);
                rowIndex++;

                // 新增試算表。
                var sheet2 = workbook.CreateSheet("My Sheet");
                // 建立儲存格樣式。
                var style1 = workbook.CreateCellStyle();
                style1.FillForegroundColor = HSSFColor.Blue.Index2;
                style1.FillPattern = FillPattern.SolidForeground;

                var style2 = workbook.CreateCellStyle();
                style2.FillForegroundColor = HSSFColor.Yellow.Index2;
                style2.FillPattern = FillPattern.SolidForeground;

                // 設定儲存格樣式與資料。
                var cell2 = sheet2.CreateRow(0).CreateCell(0);
                cell2.CellStyle = style1;
                cell2.SetCellValue(0);

                cell2 = sheet2.CreateRow(1).CreateCell(0);
                cell2.CellStyle = style2;
                cell2.SetCellValue(1);

                cell2 = sheet2.CreateRow(2).CreateCell(0);
                cell2.CellStyle = style1;
                cell2.SetCellValue(2);

                cell2 = sheet2.CreateRow(3).CreateCell(0);
                cell2.CellStyle = style2;
                cell2.SetCellValue(3);

                cell2 = sheet2.CreateRow(4).CreateCell(0);
                cell2.CellStyle = style1;
                cell2.SetCellValue(4);

                workbook.Write(fs);
                return File(fs, "application/ms-excel", "core.xlsx");
            }
        }


    }
}