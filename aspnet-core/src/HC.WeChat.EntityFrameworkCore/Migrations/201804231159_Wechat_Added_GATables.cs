using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class Wechat_Added_GATables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Articles",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(maxLength: 200, nullable: false),
                    Author = table.Column<string>(maxLength: 50, nullable: false),
                    Type = table.Column<int>(nullable: true),
                    CoverPhoto = table.Column<string>(maxLength: 500, nullable: false),
                    Content = table.Column<string>(nullable: true),
                    ReadTotal = table.Column<int>(nullable: true),
                    GoodTotal = table.Column<int>(nullable: true),
                    TenantId = table.Column<int>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    DeleterUserId = table.Column<long>(nullable: true),
                    PushTime = table.Column<DateTime>(nullable: true)

                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IntegralDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    OpenId = table.Column<string>(maxLength: 50, nullable: true),
                    InitialIntegral = table.Column<int>(nullable: true),
                    Integral = table.Column<int>(nullable: true),
                    FinalIntegral = table.Column<int>(nullable: true),
                    Type = table.Column<int>(nullable: true),
                    Desc = table.Column<string>(maxLength: 500, nullable: true),
                    RefId = table.Column<Guid>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    TenantId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntegralDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Manuscripts",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Type = table.Column<int>(nullable: true),
                    Title = table.Column<string>(maxLength: 200, nullable: false),
                    Content = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(maxLength: 50, nullable: true),
                    Phone = table.Column<string>(maxLength: 20, nullable: true),
                    OpenId = table.Column<string>(maxLength: 50, nullable: true),
                    Status = table.Column<int>(nullable: true),
                    TenantId = table.Column<int>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    DealWithTime = table.Column<DateTime>(nullable: true)

                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Manuscripts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MemberConfigs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    TenantId = table.Column<int>(nullable: true),
                    Type = table.Column<int>(nullable: true),
                    Code = table.Column<int>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberConfigs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Specification = table.Column<string>(maxLength: 200, nullable: false),
                    Type = table.Column<int>(nullable: true),
                    Price = table.Column<decimal>(nullable: true),
                    IsRare = table.Column<bool>(nullable: true),
                    PackageCode = table.Column<string>(maxLength: 50, nullable: true),
                    BarCode = table.Column<string>(maxLength: 50, nullable: true),
                    SearchCount = table.Column<int>(nullable: true),
                    IsAction = table.Column<bool>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    TenantId = table.Column<int>(nullable: true),
                    CreatorUserId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ProductId = table.Column<Guid>(nullable: true),
                    Specification = table.Column<string>(maxLength: 200, nullable: true),
                    Quantity = table.Column<int>(nullable: true),
                    ShopId = table.Column<Guid>(nullable: true),
                    ShopName = table.Column<string>(maxLength: 200, nullable: true),
                    OpenId = table.Column<string>(maxLength: 50, nullable: false),
                    TenantId = table.Column<int>(nullable: true),
                    Integral = table.Column<int>(nullable: true),
                    Remark = table.Column<string>(maxLength: 500, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseRecords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shops",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 200, nullable: false),
                    Address = table.Column<string>(maxLength: 200, nullable: true),
                    Desc = table.Column<string>(maxLength: 500, nullable: true),
                    RetailerId = table.Column<Guid>(nullable: true),
                    CoverPhoto = table.Column<string>(maxLength: 500, nullable: true),
                    SaleTotal = table.Column<int>(nullable: true),
                    ReadTotal = table.Column<int>(nullable: true),
                    Evaluation = table.Column<string>(maxLength: 100, nullable: true),
                    Longitude = table.Column<decimal>(nullable: true),
                    Latitude = table.Column<decimal>(nullable: true),
                    Status = table.Column<int>(nullable: true),
                    AuditTime = table.Column<DateTime>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    TenantId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shops", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShopEvaluations",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    PurchaseRecordId = table.Column<Guid>(nullable: true),
                    ShopId = table.Column<Guid>(nullable: false),
                    OpenId = table.Column<string>(maxLength: 50, nullable: false),
                    Evaluation = table.Column<int>(nullable: true),
                    IsCorrectQuantity = table.Column<bool>(nullable: true),
                    Content = table.Column<string>(maxLength: 500, nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    TenantId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopEvaluations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShopProducts",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ProductId = table.Column<Guid>(nullable: false),
                    ShopId = table.Column<Guid>(nullable: false),
                    Specification = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopProducts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StatisticalDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    OpenId = table.Column<string>(maxLength: 50, nullable: false),
                    ArticleId = table.Column<Guid>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    TenantId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StatisticalDetail s", x => x.Id);
                });

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                 name: "Articles");
            migrationBuilder.DropTable(
                 name: "IntegralDetails");
            migrationBuilder.DropTable(
                 name: "Manuscripts");
            migrationBuilder.DropTable(
                 name: "MemberConfigs");
            migrationBuilder.DropTable(
                 name: "Products");
            migrationBuilder.DropTable(
                 name: "PurchaseRecords");
            migrationBuilder.DropTable(
                 name: "Shops");
            migrationBuilder.DropTable(
                 name: "ShopEvaluations");
            migrationBuilder.DropTable(
                 name: "ShopProducts");
            migrationBuilder.DropTable(
                 name: "StatisticalDetails");
        }
    }
}
