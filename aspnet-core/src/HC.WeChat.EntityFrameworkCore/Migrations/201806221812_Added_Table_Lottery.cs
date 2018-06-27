using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;
using JetBrains.Annotations;

namespace HC.WeChat.Migrations
{
    public partial class Added_Table_Lottery : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                  name: "LuckyDraws",
                  columns: table => new
                  {
                      Id = table.Column<Guid>(nullable: false),
                      Name = table.Column<string>(maxLength: 200, nullable: false),
                      BeginTime = table.Column<DateTime>(nullable: true),
                      EndTime = table.Column<DateTime>(nullable: true),
                      Type = table.Column<int>(nullable: false),
                      Content = table.Column<string>(nullable: true),
                      Desc = table.Column<string>(nullable: true),
                      Consume = table.Column<int>(nullable: true),
                      Frequency = table.Column<int>(nullable: true),
                      TenantId = table.Column<int>(nullable: true),
                      CreationTime = table.Column<DateTime>(nullable: false),
                      CreatorUserId = table.Column<long>(nullable: true),
                      LastModificationTime = table.Column<DateTime>(nullable: true),
                      LastModifierUserId = table.Column<long>(nullable: true)
                  },
                  constraints: table =>
                  {
                      table.PrimaryKey("PK_LuckyDraws", x => x.Id);
                  });

            migrationBuilder.CreateTable(
                 name: "Prizes",
                 columns: table => new
                 {
                     Id = table.Column<Guid>(nullable: false),
                     Name = table.Column<string>(maxLength: 50, nullable: false),
                     Value = table.Column<int>(nullable: false),
                     LuckyDrawId = table.Column<Guid>(nullable: false),
                     Type = table.Column<int>(nullable: false),
                     Color = table.Column<string>(maxLength: 50, nullable: true),
                     GetWay = table.Column<int>(nullable: false),
                     Num = table.Column<int>(nullable: true),
                     UserMaxNum = table.Column<int>(nullable: true),
                     WinningNum = table.Column<int>(nullable: true),
                     WinningRate = table.Column<decimal>(nullable: true),
                     Seq = table.Column<int>(nullable: true),
                     ExpiryDay = table.Column<int>(nullable: true),
                     LimitedMode = table.Column<int>(nullable: true),
                     LimitedNum = table.Column<int>(nullable: true),
                     IsDeleted = table.Column<bool>(nullable: false),
                     CreationTime = table.Column<DateTime>(nullable: false),
                     CreatorUserId = table.Column<long>(nullable: true),
                     LastModificationTime = table.Column<DateTime>(nullable: true),
                     LastModifierUserId = table.Column<long>(nullable: true),
                     DeletionTime = table.Column<DateTime>(nullable: true),
                     DeleterUserId = table.Column<long>(nullable: true)
                 },
                 constraints: table =>
                 {
                     table.PrimaryKey("PK_Prizes", x => x.Id);
                 });

            migrationBuilder.CreateTable(
                name: "UserAddresss",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Phone = table.Column<string>(maxLength: 20, nullable: false),
                    Address = table.Column<string>(maxLength: 500, nullable: false),
                    IsDefault = table.Column<bool>(nullable: true),
                    Remark = table.Column<string>(maxLength: 500, nullable: true),
                    TenantId = table.Column<int>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    DeleterUserId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAddresss", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WinningRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    PrizeId = table.Column<Guid>(nullable: true),
                    UserId = table.Column<Guid>(nullable: true),
                    AddressId = table.Column<Guid>(nullable: true),
                    WinningTime = table.Column<DateTime>(nullable: true),
                    Num = table.Column<int>(nullable: true),
                    ExpiryTime = table.Column<DateTime>(nullable: false),
                    Status = table.Column<int>(nullable: true),
                    ApplyTime = table.Column<DateTime>(nullable: true),
                    CompleteTime = table.Column<DateTime>(nullable: true),
                    ExpressCompany = table.Column<string>(maxLength: 200, nullable: true),
                    ExpressNo = table.Column<string>(maxLength: 50, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WinningRecords", x => x.Id);
                });

            migrationBuilder.AddColumn<string>(
            name: "Ticket",
            table: "Shops",
            nullable: true);

            migrationBuilder.AddColumn<string>(
            name: "WechatUrl",
            table: "Shops",
            nullable: true);

            migrationBuilder.AddColumn<string>(
           name: "Ticket",
           table: "WeChatUsers",
           nullable: true);

            migrationBuilder.AddColumn<int?>(
           name: "SourceType",
           table: "WeChatUsers",
           nullable: true);

            migrationBuilder.AddColumn<string>(
           name: "SourceId",
           table: "WeChatUsers",
           nullable: true);

        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                 name: "LuckyDraws");
            migrationBuilder.DropTable(
                name: "Prizes");
            migrationBuilder.DropTable(
                name: "UserAddresss");
            migrationBuilder.DropTable(
                name: "WinningRecords"); 

            migrationBuilder.DropColumn(
                name: "Ticket",
                table: "Shops");

            migrationBuilder.DropColumn(
               name: "WechatUrl",
               table: "Shops");

            migrationBuilder.DropColumn(
               name: "Ticket",
               table: "WeChatUsers");

            migrationBuilder.DropColumn(
               name: "SourceType",
               table: "WeChatUsers");

            migrationBuilder.DropColumn(
               name: "SourceId",
               table: "WeChatUsers");
        }
    }
}
