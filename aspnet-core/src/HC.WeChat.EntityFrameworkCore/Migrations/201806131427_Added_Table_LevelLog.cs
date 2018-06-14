using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class Added_Table_LevelLog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
               name: "LevelLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    LevelData = table.Column<string>(maxLength: 50,nullable: false),
                    ChangeTime = table.Column<DateTime>(nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LevelLogs", x => x.Id);
                });

            migrationBuilder.AddColumn<string>(
            name: "SingleTotal", 
            table: "Shops",
            nullable: true);
        }
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                 name: "LevelLogs");
            migrationBuilder.DropColumn(
                    name: "SingleTotal",
                    table: "Shops");
        }
    }
}
