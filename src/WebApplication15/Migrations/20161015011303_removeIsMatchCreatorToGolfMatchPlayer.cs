using System;
using System.Collections.Generic;
using Microsoft.Data.Entity.Migrations;

namespace WebApplication15.Migrations
{
    public partial class removeIsMatchCreatorToGolfMatchPlayer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_ClubMemberEmail_Club_ClubId", table: "ClubMemberEmail");
            migrationBuilder.DropForeignKey(name: "FK_GolfMatch_Club_ClubId", table: "GolfMatch");
            migrationBuilder.DropForeignKey(name: "FK_GolfMatchPlayer_GolfMatch_GolfMatchId", table: "GolfMatchPlayer");
            migrationBuilder.DropForeignKey(name: "FK_GolfMatchPlayer_InviteStatus_InviteStatusId", table: "GolfMatchPlayer");
            migrationBuilder.DropForeignKey(name: "FK_PlayerQueue_GolfMatch_GolfMatchId", table: "PlayerQueue");
            migrationBuilder.DropForeignKey(name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId", table: "AspNetRoleClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId", table: "AspNetUserClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId", table: "AspNetUserLogins");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_IdentityRole_RoleId", table: "AspNetUserRoles");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_ApplicationUser_UserId", table: "AspNetUserRoles");
            migrationBuilder.AddColumn<bool>(
                name: "IsMatchCreator",
                table: "GolfMatchPlayer",
                nullable: false,
                defaultValue: false);
            migrationBuilder.AddForeignKey(
                name: "FK_ClubMemberEmail_Club_ClubId",
                table: "ClubMemberEmail",
                column: "ClubId",
                principalTable: "Club",
                principalColumn: "ClubId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_GolfMatch_Club_ClubId",
                table: "GolfMatch",
                column: "ClubId",
                principalTable: "Club",
                principalColumn: "ClubId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_GolfMatchPlayer_GolfMatch_GolfMatchId",
                table: "GolfMatchPlayer",
                column: "GolfMatchId",
                principalTable: "GolfMatch",
                principalColumn: "GolfMatchId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_GolfMatchPlayer_InviteStatus_InviteStatusId",
                table: "GolfMatchPlayer",
                column: "InviteStatusId",
                principalTable: "InviteStatus",
                principalColumn: "InviteStatusId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_PlayerQueue_GolfMatch_GolfMatchId",
                table: "PlayerQueue",
                column: "GolfMatchId",
                principalTable: "GolfMatch",
                principalColumn: "GolfMatchId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_IdentityRole_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_ApplicationUser_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(name: "FK_ClubMemberEmail_Club_ClubId", table: "ClubMemberEmail");
            migrationBuilder.DropForeignKey(name: "FK_GolfMatch_Club_ClubId", table: "GolfMatch");
            migrationBuilder.DropForeignKey(name: "FK_GolfMatchPlayer_GolfMatch_GolfMatchId", table: "GolfMatchPlayer");
            migrationBuilder.DropForeignKey(name: "FK_GolfMatchPlayer_InviteStatus_InviteStatusId", table: "GolfMatchPlayer");
            migrationBuilder.DropForeignKey(name: "FK_PlayerQueue_GolfMatch_GolfMatchId", table: "PlayerQueue");
            migrationBuilder.DropForeignKey(name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId", table: "AspNetRoleClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId", table: "AspNetUserClaims");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId", table: "AspNetUserLogins");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_IdentityRole_RoleId", table: "AspNetUserRoles");
            migrationBuilder.DropForeignKey(name: "FK_IdentityUserRole<string>_ApplicationUser_UserId", table: "AspNetUserRoles");
            migrationBuilder.DropColumn(name: "IsMatchCreator", table: "GolfMatchPlayer");
            migrationBuilder.AddForeignKey(
                name: "FK_ClubMemberEmail_Club_ClubId",
                table: "ClubMemberEmail",
                column: "ClubId",
                principalTable: "Club",
                principalColumn: "ClubId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_GolfMatch_Club_ClubId",
                table: "GolfMatch",
                column: "ClubId",
                principalTable: "Club",
                principalColumn: "ClubId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_GolfMatchPlayer_GolfMatch_GolfMatchId",
                table: "GolfMatchPlayer",
                column: "GolfMatchId",
                principalTable: "GolfMatch",
                principalColumn: "GolfMatchId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_GolfMatchPlayer_InviteStatus_InviteStatusId",
                table: "GolfMatchPlayer",
                column: "InviteStatusId",
                principalTable: "InviteStatus",
                principalColumn: "InviteStatusId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_PlayerQueue_GolfMatch_GolfMatchId",
                table: "PlayerQueue",
                column: "GolfMatchId",
                principalTable: "GolfMatch",
                principalColumn: "GolfMatchId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityRoleClaim<string>_IdentityRole_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserClaim<string>_ApplicationUser_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserLogin<string>_ApplicationUser_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_IdentityRole_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
            migrationBuilder.AddForeignKey(
                name: "FK_IdentityUserRole<string>_ApplicationUser_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
