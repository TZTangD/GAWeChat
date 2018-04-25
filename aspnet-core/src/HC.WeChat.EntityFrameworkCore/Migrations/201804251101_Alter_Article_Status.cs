using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
  public partial class Alter_Article_Status: Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
               name: "CoverPhoto",
               table: "Articles",
               nullable: true);

            migrationBuilder.AddColumn<int?>(
             name: "PushStatus",
             table: "Articles",
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
        }
    }
}
