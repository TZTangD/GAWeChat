using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class Added_Columns_Products : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
            name: "ItemId",
            table: "Products",
            maxLength: 50,
            nullable: true);

            migrationBuilder.AddColumn<string>(
            name: "ItemCode",
            table: "Products",
            maxLength: 50,
            nullable: true);

            migrationBuilder.AddColumn<string>(
             name: "MfrId",
             table: "Products",
             maxLength: 50,
             nullable: true);

            migrationBuilder.AddColumn<string>(
             name: "Company",
             table: "Products",
             maxLength: 100,
             nullable: true);

            migrationBuilder.AddColumn<bool?>(
             name: "IsEvaluation",
             table: "PurchaseRecords",
             nullable: true);

            migrationBuilder.AlterColumn<string>(
            name: "CustId",
            table: "Retailers",
            nullable: true);

            migrationBuilder.AlterColumn<string>(
            name: "DepartmentId",
            table: "Retailers",
            nullable: true);

            migrationBuilder.AlterColumn<string>(
            name: "Desc",
            table: "MemberConfigs",
            nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
            name: "ItemId",
            table: "Products");

            migrationBuilder.DropColumn(
            name: "ItemCode",
            table: "Products");

            migrationBuilder.DropColumn(
            name: "MfrId",
            table: "Products");

            migrationBuilder.DropColumn(
            name: "Company",
            table: "Products");


            migrationBuilder.DropColumn(
            name: "IsEvaluation",
            table: "PurchaseRecords");

            migrationBuilder.AlterColumn<string>(
            name: "CustId",
            table: "Retailers");

            migrationBuilder.AlterColumn<string>(
            name: "DepartmentId",
            table: "Retailers");

            migrationBuilder.AlterColumn<string>(
            name: "Desc",
            table: "MemberConfigs");
        }
    }
}
