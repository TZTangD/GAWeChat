using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class Added_Columns_Shop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
           name: "Reason",
           table: "Shops",
           maxLength: 500,
           nullable: true);
            migrationBuilder.AddColumn<string>(
          name: "AttentionTime",
          table: "WeChatUsers",
          nullable: true);
            migrationBuilder.AddColumn<string>(
          name: "UnfollowTime",
          table: "WeChatUsers",
          nullable: true);

            migrationBuilder.AddColumn<string>(
           name: "InnerCode",
           table: "Employees",
           maxLength: 500,
           nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
            name: "Reason",
            table: "Shops");
            migrationBuilder.DropColumn(
                    name: "AttentionTime",
              table: "WeChatUsers");
            migrationBuilder.DropColumn(
          name: "UnfollowTime",
          table: "WeChatUsers");
            
            migrationBuilder.DropColumn(
            name: "InnerCode",
            table: "Employees");
        }
    }
}
