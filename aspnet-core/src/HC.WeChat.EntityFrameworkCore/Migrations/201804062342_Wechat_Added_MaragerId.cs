using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class Wechat_Added_MaragerId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid?>(
                name: "ManagerId",
                table: "ActivityForms",
                nullable: true);

            migrationBuilder.AddColumn<Guid?>(
               name: "CreationId",
               table: "ActivityForms",
               nullable: true);

            migrationBuilder.AddColumn<string>(
              name: "DeliveryRemark",
              table: "ActivityDeliveryInfos",
               maxLength: 500,
              nullable: true);

            migrationBuilder.AddColumn<string>(
            name: "HeadImgUrl",
            table: "WeChatUsers",
             maxLength: 500,
            nullable: true);

            migrationBuilder.AlterColumn<string>(
               name: "ActivityGoodsId",
               table: "ActivityForms",
               nullable: true,
               oldClrType: typeof(string),
               oldNullable: false);

            migrationBuilder.AlterColumn<string>(
               name: "GoodsSpecification",
               table: "ActivityForms",
               nullable: true,
               oldClrType: typeof(string),
               oldNullable: false);

            migrationBuilder.AlterColumn<string>(
              name: "PhotoUrl",
              table: "ActivityBanquets",
              nullable: true,
              oldClrType: typeof(string),
              oldNullable: false);

            migrationBuilder.AlterColumn<string>(
              name: "UserName",
              table: "ActivityDeliveryInfos",
              nullable: true,
              oldClrType: typeof(string),
              oldNullable: false);

            migrationBuilder.AlterColumn<string>(
             name: "Phone",
             table: "ActivityDeliveryInfos",
             nullable: true,
             oldClrType: typeof(string),
             oldNullable: false);

            migrationBuilder.AlterColumn<string>(
             name: "Address",
             table: "ActivityDeliveryInfos",
             nullable: true,
             oldClrType: typeof(string),
             oldNullable: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSend",
                table: "ActivityDeliveryInfos",
                defaultValue: false,
                nullable: false);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ManagerId",
                table: "ActivityForms");

            migrationBuilder.DropColumn(
               name: "CreationId",
               table: "ActivityForms");

            migrationBuilder.DropColumn(
               name: "DeliveryRemark",
               table: "ActivityDeliveryInfos");

            migrationBuilder.DropColumn(
              name: "HeadImgUrl",
              table: "WeChatUsers");

            migrationBuilder.AlterColumn<string>(
             name: "ActivityGoodsId",
             table: "ActivityForms",
             nullable: false,
             oldClrType: typeof(string),
             oldNullable: true);

            migrationBuilder.AlterColumn<string>(
               name: "GoodsSpecification",
               table: "ActivityForms",
               nullable: false,
               oldClrType: typeof(string),
               oldNullable: true);

            migrationBuilder.AlterColumn<string>(
              name: "PhotoUrl",
              table: "ActivityBanquets",
              nullable: false,
              oldClrType: typeof(string),
              oldNullable: true);

            migrationBuilder.AlterColumn<string>(
             name: "UserName",
             table: "ActivityDeliveryInfos",
             nullable: false,
             oldClrType: typeof(string),
             oldNullable: true);

            migrationBuilder.AlterColumn<string>(
             name: "Phone",
             table: "ActivityDeliveryInfos",
             nullable: false,
             oldClrType: typeof(string),
             oldNullable: true);

            migrationBuilder.AlterColumn<string>(
             name: "Address",
             table: "ActivityDeliveryInfos",
             nullable: false,
             oldClrType: typeof(string),
             oldNullable: true);

            migrationBuilder.DropColumn(
                name: "IsSend",
                table: "ActivityDeliveryInfos");
        }
    }
}
