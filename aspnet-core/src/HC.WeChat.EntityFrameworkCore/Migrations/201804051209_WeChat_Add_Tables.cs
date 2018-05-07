using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class WeChat_Add_Tables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int?>(
               name: "Type",
               table: "ActivityDeliveryInfos",
               nullable: true);

            migrationBuilder.AddColumn<string>(
              name: "ExpressCompany",
              table: "ActivityDeliveryInfos",
              maxLength: 200,
              nullable: true);

            migrationBuilder.AddColumn<string>(
              name: "ExpressNo",
              table: "ActivityDeliveryInfos",
               maxLength: 200,
              nullable: true);

            migrationBuilder.AddColumn<string>(
              name: "Remark",
              table: "ActivityDeliveryInfos",
               maxLength: 500,
              nullable: true);

            migrationBuilder.AddColumn<DateTime?>(
              name: "SendTime",
              table: "ActivityDeliveryInfos",
              nullable: true);

            migrationBuilder.AddColumn<DateTime>(
              name: "CreationTime",
              table: "ActivityDeliveryInfos",
              nullable: true);

            migrationBuilder.CreateTable(
                 name: "Advises",
                 columns: table => new
                 {
                     Id = table.Column<Guid>(nullable: false),
                     Title = table.Column<string>(maxLength: 500, nullable: false),
                     UserTypeName = table.Column<string>(maxLength: 50, nullable: false),
                     OpenId = table.Column<string>(maxLength: 50, nullable: true),
                     Phone = table.Column<string>(maxLength: 20, nullable: true),
                     Content = table.Column<string>(maxLength: 500, nullable: true),
                     PhotoUrl = table.Column<string>(maxLength: 2000, nullable: true),
                     TenantId = table.Column<int?>(nullable: true),
                     CreationTime = table.Column<DateTime>(nullable: false)
                 },
                 constraints: table =>
                 {
                     table.PrimaryKey("PK_Advises", x => x.Id);
                 });

            migrationBuilder.CreateTable(
                name: "UserQuestions",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 500, nullable: false),
                    UserName = table.Column<string>(maxLength: 50, nullable: true),
                    Phone = table.Column<string>(maxLength: 20, nullable: true),
                    Address = table.Column<string>(maxLength: 500, nullable: true),
                    OpenId = table.Column<string>(maxLength: 50, nullable: true),
                    TenantId = table.Column<int?>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserQuestions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserAnswers",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserQuestionId = table.Column<Guid>(nullable: false),
                    AnswerSqe = table.Column<int?>(nullable: true),
                    Content = table.Column<string>(maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAnswers", x => x.Id);
                    table.ForeignKey(
                       name: "FK_PK_UserAnswers_UserQuestions_UserQuestionId",
                       column: x => x.UserQuestionId,
                       principalTable: "UserQuestions",
                       principalColumn: "Id",
                       onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserAnswers");
            migrationBuilder.DropTable(
                name: "UserQuestions");
            migrationBuilder.DropTable(
                name: "Advises");
           
            migrationBuilder.DropColumn(
                name: "Type",
                table: "ActivityDeliveryInfos");
            migrationBuilder.DropColumn(
                name: "ExpressCompany",
                table: "ActivityDeliveryInfos");
            migrationBuilder.DropColumn(
                name: "ExpressNo",
                table: "ActivityDeliveryInfos");
            migrationBuilder.DropColumn(
                name: "Remark",
                table: "ActivityDeliveryInfos");
            migrationBuilder.DropColumn(
                name: "SendTime",
                table: "ActivityDeliveryInfos");
            migrationBuilder.DropColumn(
               name: "CreationTime",
               table: "ActivityDeliveryInfos");
        }
    }
}
