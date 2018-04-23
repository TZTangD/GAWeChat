using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class WeChat_Activity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                 name: "Activities",
                 columns: table => new
                 {
                     Id = table.Column<Guid>(nullable: false),
                     Name = table.Column<string>(maxLength: 200, nullable: false),
                     BeginTime = table.Column<DateTime>(nullable: false),
                     EndTime = table.Column<DateTime>(nullable: false),
                     ActivityType = table.Column<int>(nullable: false),
                     Content = table.Column<string>(nullable: false),
                     MUnfinished = table.Column<int>(nullable: true),
                     RUnfinished = table.Column<int>(nullable: true),
                     TenantId = table.Column<int>(nullable: true),
                     IsDeleted = table.Column<bool>(nullable: false),
                     CreationTime = table.Column<DateTime>(nullable: false),
                     CreatorUserId = table.Column<long>(nullable: true),
                     LastModificationTime = table.Column<DateTime>(nullable: true),
                     LastModifierUserId = table.Column<long>(nullable: true),
                     DeletionTime = table.Column<DateTime>(nullable: true),
                     DeleterUserId = table.Column<long>(nullable: true),
                     PublishTime = table.Column<DateTime>(nullable: true),
                     Status = table.Column<int>(nullable: false)
                 },
                 constraints: table =>
                 {
                     table.PrimaryKey("PK_Activities", x => x.Id);
                 });

            migrationBuilder.CreateTable(
               name: "ActivityForms",
               columns: table => new
               {
                   Id = table.Column<Guid>(nullable: false),
                   FormCode = table.Column<string>(maxLength: 50, nullable: false),
                   ActivityId = table.Column<Guid>(nullable: false),
                   RetailerId = table.Column<Guid>(nullable: true),
                   ActivityGoodsId = table.Column<Guid>(nullable: false),
                   GoodsSpecification = table.Column<string>(maxLength: 200, nullable: false),
                   Num = table.Column<int>(nullable: false),
                   Reason = table.Column<string>(nullable: false),
                   Status = table.Column<int>(nullable: false),
                   CreationTime = table.Column<DateTime>(nullable: false)
               },
               constraints: table =>
               {
                   table.PrimaryKey("PK_ActivityForms", x => x.Id);
                   table.ForeignKey(
                        name: "FK_ActivityForms_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
               });

            migrationBuilder.CreateTable(
                name: "ActivityBanquets",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ActivityFormId = table.Column<Guid>(nullable: false),
                    Area = table.Column<string>(nullable: false),
                    Responsible = table.Column<string>(maxLength: 50, nullable: true),
                    Executor = table.Column<string>(maxLength: 50, nullable: true),
                    BanquetTime = table.Column<DateTime>(nullable: false),
                    Position = table.Column<string>(maxLength: 500, nullable: false),
                    Num = table.Column<int>(nullable: false),
                    Desc = table.Column<string>(maxLength: 500, nullable: false),
                    PhotoUrl = table.Column<string>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    UserName = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityBanquets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityBanquets_ActivityForms_ActivityFormId",
                        column: x => x.ActivityFormId,
                        principalTable: "ActivityForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityDeliveryInfos",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ActivityFormId = table.Column<Guid>(nullable: false),
                    UserName = table.Column<string>(maxLength: 50, nullable: false),
                    Phone = table.Column<string>(maxLength: 20, nullable: false),
                    Address = table.Column<string>(maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityDeliveryInfos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityDeliveryInfos_ActivityForms_ActivityFormId",
                        column: x => x.ActivityFormId,
                        principalTable: "ActivityForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityFormLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ActivityFormId = table.Column<Guid>(nullable: false),
                    Status = table.Column<int>(nullable: false),
                    StatusName = table.Column<string>(nullable: false),
                    Opinion = table.Column<string>(maxLength: 200, nullable: true),
                    UserType = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true),
                    UserName = table.Column<string>(maxLength: 50, nullable: true),
                    ActionTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityFormLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityFormLogs_ActivityForms_ActivityFormId",
                        column: x => x.ActivityFormId,
                        principalTable: "ActivityForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityGoodses",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Specification = table.Column<string>(maxLength: 200, nullable: false),
                    ActivityId = table.Column<Guid>(nullable: false),
                    MinNum = table.Column<int>(nullable: false),
                    MaxNum = table.Column<int>(nullable: false),
                    DiscountDesc = table.Column<string>(nullable: true),
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
                    table.PrimaryKey("PK_ActivityGoodses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityGoodses_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Code = table.Column<string>(maxLength: 50, nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Position = table.Column<int>(nullable: false),
                    Phone = table.Column<string>(maxLength: 20, nullable: true),
                    Company = table.Column<string>(maxLength: 200, nullable: true),
                    Department = table.Column<string>(maxLength: 200, nullable: true),
                    IsAction = table.Column<bool>(nullable: false),
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
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Retailers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Code = table.Column<string>(maxLength: 50, nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    BusinessAddress = table.Column<string>(maxLength: 500, nullable: true),
                    ArchivalLevel = table.Column<string>(maxLength: 100, nullable: true),
                    OrderCycle = table.Column<string>(maxLength: 100, nullable: true),
                    StoreType = table.Column<string>(maxLength: 100, nullable: true),
                    Telephone = table.Column<string>(maxLength: 100, nullable: true),
                    IsAction = table.Column<bool>(nullable: false),
                    BranchCompany = table.Column<string>(maxLength: 200, nullable: true),
                    Department = table.Column<string>(maxLength: 100, nullable: true),
                    EmployeeId = table.Column<Guid>(nullable: true),
                    Manager = table.Column<string>(maxLength: 50, nullable: true),
                    OrderMode = table.Column<int>(nullable: true),
                    TerminalType = table.Column<int>(nullable: true),
                    BusinessType = table.Column<string>(maxLength: 100, nullable: true),
                    Scale = table.Column<int>(nullable: true),
                    MarketType = table.Column<int>(nullable: true),
                    DeliveryLine = table.Column<string>(maxLength: 500, nullable: true),
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
                    table.PrimaryKey("PK_Retailers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WeChatUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    NickName = table.Column<string>(maxLength: 50, nullable: false),
                    OpenId = table.Column<string>(maxLength: 50, nullable: false),
                    UserType = table.Column<int>(nullable: false),
                    UserId = table.Column<Guid>(nullable: true),
                    UserName = table.Column<string>(maxLength: 50, nullable: false),
                    BindStatus = table.Column<int>(nullable: false),
                    BindTime = table.Column<DateTime>(nullable: true),
                    TenantId = table.Column<int>(nullable: true),
                    UnBindTime = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeChatUsers", x => x.Id);
                });

            migrationBuilder.AddColumn<Guid>(
               name: "EmployeeId",
               table: "AbpUsers",
               nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Activities");
            migrationBuilder.DropTable(
                name: "ActivityBanquets");
            migrationBuilder.DropTable(
                name: "ActivityDeliveryInfos");
            migrationBuilder.DropTable(
                name: "ActivityForms");
            migrationBuilder.DropTable(
                name: "ActivityFormLogs");
            migrationBuilder.DropTable(
                name: "ActivityGoodses");
            migrationBuilder.DropTable(
                name: "Employees");
            migrationBuilder.DropTable(
                name: "Retailers");
            migrationBuilder.DropTable(
                name: "WeChatUsers");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "AbpUsers");
        }
    }
}
