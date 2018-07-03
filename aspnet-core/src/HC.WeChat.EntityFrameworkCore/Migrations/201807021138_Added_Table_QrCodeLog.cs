using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class Added_Table_QrCodeLog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                 name: "QrCodeLogs",
                 columns: table => new
                 {
                     Id = table.Column<Guid>(nullable: false),
                     AttentionTime = table.Column<DateTime>(nullable: false),
                     OpenId = table.Column<string>(maxLength: 50, nullable: true),
                     SourceId = table.Column<string>(maxLength: 100, nullable: true),
                     SourceType = table.Column<int>(nullable: true),
                     Ticket = table.Column<string>(maxLength: 200, nullable: true),
                     TenantId = table.Column<int>(nullable: true),
                     CreationTime = table.Column<DateTime>(nullable: false),
                     CreatorUserId = table.Column<long>(nullable: true),
                 },
                 constraints: table =>
                 {
                     table.PrimaryKey("PK_QrCodeLogs", x => x.Id);
                 });
            migrationBuilder.AddColumn<int?>(
           name: "FansNum",
           table: "Shops",
           nullable: true);
        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                 name: "QrCodeLogs");

            migrationBuilder.DropColumn(
               name: "FansNum",
               table: "Shops");
        }
    }
}
