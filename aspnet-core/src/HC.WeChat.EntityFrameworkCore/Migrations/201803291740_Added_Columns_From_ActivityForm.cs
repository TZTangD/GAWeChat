using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class Added_Columns_From_ActivityForm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ActivityName",
                table: "ActivityForms",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
               name: "RetailerName",
               table: "ActivityForms",
               maxLength: 50,
               nullable: true);

            migrationBuilder.AddColumn<string>(
              name: "ManagerName",
              table: "ActivityForms",
              maxLength: 50,
              nullable: true);

            migrationBuilder.AddColumn<string>(
             name: "LicenseKey",
             table: "Retailers",
             maxLength: 50,
             nullable: true);

            migrationBuilder.AddColumn<string>(
            name: "CreationUser",
            table: "ActivityForms",
            maxLength: 50,
            nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActivityName",
                table: "ActivityForms");

            migrationBuilder.DropColumn(
               name: "RetailerName",
               table: "ActivityForms");

            migrationBuilder.DropColumn(
               name: "ManagerName",
               table: "ActivityForms");

            migrationBuilder.DropColumn(
              name: "LicenseKey",
              table: "Retailers");

            migrationBuilder.DropColumn(
             name: "CreationUser",
             table: "ActivityForms");

        }
    }
}
