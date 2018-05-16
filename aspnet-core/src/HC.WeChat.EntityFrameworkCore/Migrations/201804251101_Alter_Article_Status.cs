using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class Alter_Article_Status : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
               name: "CoverPhoto",
               table: "Articles",
               maxLength: 500,
               nullable: true);

            migrationBuilder.AddColumn<int?>(
             name: "PushStatus",
             table: "Articles",
             nullable: true);

            migrationBuilder.AddColumn<string>(
              name: "Tel",
              table: "Shops",
              maxLength: 20,
              nullable: true);

            migrationBuilder.AddColumn<string>(
             name: "PhotoUrl",
             table: "Products",
             maxLength: 500,
             nullable: true);

        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
               name: "CoverPhoto",
               table: "Articles",
               nullable: false);

            migrationBuilder.DropColumn(
              name: "PushStatus",
              table: "Articles");

            migrationBuilder.DropColumn(
              name: "Tel",
              table: "Shops");

            migrationBuilder.DropColumn(
            name: "PhotoUrl",
            table: "Products");
        }
    }
}
