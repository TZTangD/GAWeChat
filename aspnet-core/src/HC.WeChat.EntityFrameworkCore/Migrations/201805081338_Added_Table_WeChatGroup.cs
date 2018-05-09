using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class Added_Table_WeChatGroup: Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
               name: "WeChatGroups",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    TypeCode = table.Column<int>(nullable: false),
                    TypeName = table.Column<string>(maxLength: 50,nullable: true),
                    TagId = table.Column<int>(nullable: false),
                    TagName = table.Column<string>(maxLength: 50,nullable: false),
                    TenantId = table.Column<int>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),

                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeChatGroups", x => x.Id);
                });

            migrationBuilder.AddColumn<string>(
             name: "OperatorOpenId",
             table: "IntegralDetails",
             maxLength: 50,
             nullable: true);

            migrationBuilder.AddColumn<string>(
             name: "OperatorName",
             table: "IntegralDetails",
             maxLength: 50,
             nullable: true);
        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                 name: "WeChatGroups");

            migrationBuilder.DropColumn(
             name: "OperatorOpenId",
             table: "IntegralDetails");

            migrationBuilder.DropColumn(
              name: "OperatorName",
              table: "IntegralDetails");
        }
    }
}
