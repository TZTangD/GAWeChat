using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Migrations
{
    public partial class Wechat_MessageConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WechatAppConfigs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false).Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    AppOrgId = table.Column<string>(maxLength: 250, nullable: false),
                    AppType = table.Column<int>(nullable: false),
                    AppId = table.Column<string>(maxLength: 250, nullable: false),
                    AppSecret = table.Column<string>(maxLength: 250, nullable: false),
                    QRCodeUrl = table.Column<string>(maxLength: 250, nullable: true),
                    Token = table.Column<string>(maxLength: 250, nullable: false),
                    AccessToken = table.Column<string>(maxLength: 255, nullable: true),
                    ExpiresIn = table.Column<int>(nullable: true),
                    NextGettime = table.Column<DateTime>(nullable: true),
                    TenantId = table.Column<int>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WechatAppConfigs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WechatMessages",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    KeyWord = table.Column<string>(maxLength: 50, nullable: false),
                    MatchMode = table.Column<int>(nullable: false),
                    MsgType = table.Column<int>(nullable: false),
                    Content = table.Column<string>(nullable: false),
                    TenantId = table.Column<int>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WechatMessages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WechatSubscribes",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    MsgType = table.Column<int>(nullable: false),
                    Content = table.Column<string>(nullable: false),
                    TenantId = table.Column<int>(nullable: true),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WechatSubscribes", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WechatAppConfigs");

            migrationBuilder.DropTable(
                name: "WechatMessages");

            migrationBuilder.DropTable(
                name: "WechatSubscribes");
        }
    }
}
