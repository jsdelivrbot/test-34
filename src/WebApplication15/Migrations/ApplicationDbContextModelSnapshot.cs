using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
using GolfConnector.Web.Models;

namespace WebApplication15.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GolfConnector.Web.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasAnnotation("Relational:ColumnName", "UserId");

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<int?>("Handicap");

                    b.Property<string>("ImagePath");

                    b.Property<bool>("IsActive");

                    b.Property<DateTime>("LastActivityDate");

                    b.Property<DateTime>("LastLoginDate");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<bool>("Reauth");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasAnnotation("Relational:Name", "EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .HasAnnotation("Relational:Name", "UserNameIndex");

                    b.HasAnnotation("Relational:TableName", "Users");
                });

            modelBuilder.Entity("GolfConnector.Web.Models.Domain.Club", b =>
                {
                    b.Property<int>("ClubId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<bool>("IsActive");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("State");

                    b.HasKey("ClubId");
                });

            modelBuilder.Entity("GolfConnector.Web.Models.Domain.ClubMemberEmail", b =>
                {
                    b.Property<int>("ClubMemberEmailId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClubId");

                    b.Property<string>("Email");

                    b.Property<bool>("IsActiveMember");

                    b.Property<bool>("IsClubAdmin");

                    b.HasKey("ClubMemberEmailId");
                });

            modelBuilder.Entity("GolfConnector.Web.Models.Domain.GolfMatch", b =>
                {
                    b.Property<int>("GolfMatchId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ClubId");

                    b.Property<string>("Comments");

                    b.Property<string>("GolfMatchDateIso");

                    b.Property<int>("NumberOfHoles");

                    b.Property<int>("NumberOfPlayers");

                    b.Property<string>("StartDate")
                        .IsRequired();

                    b.Property<string>("Time");

                    b.HasKey("GolfMatchId");
                });

            modelBuilder.Entity("GolfConnector.Web.Models.Domain.GolfMatchPlayer", b =>
                {
                    b.Property<int>("GolfMatchPlayerId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("GolfMatchId");

                    b.Property<DateTime?>("InviteDate");

                    b.Property<int>("InviteStatusId");

                    b.Property<bool>("IsMatchCreator");

                    b.Property<string>("UserId");

                    b.HasKey("GolfMatchPlayerId");
                });

            modelBuilder.Entity("GolfConnector.Web.Models.Domain.InviteStatus", b =>
                {
                    b.Property<int>("InviteStatusId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("InviteStatusId");
                });

            modelBuilder.Entity("GolfConnector.Web.Models.Domain.PlayerQueue", b =>
                {
                    b.Property<int>("PlayerQueueId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("GolfMatchId");

                    b.Property<short>("QueueNumber");

                    b.Property<string>("UserId");

                    b.HasKey("PlayerQueueId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasAnnotation("Relational:Name", "RoleNameIndex");

                    b.HasAnnotation("Relational:TableName", "AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasAnnotation("Relational:TableName", "AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasAnnotation("Relational:TableName", "AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasAnnotation("Relational:TableName", "AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasAnnotation("Relational:TableName", "AspNetUserRoles");
                });

            modelBuilder.Entity("GolfConnector.Web.Models.Domain.ClubMemberEmail", b =>
                {
                    b.HasOne("GolfConnector.Web.Models.Domain.Club")
                        .WithMany()
                        .HasForeignKey("ClubId");
                });

            modelBuilder.Entity("GolfConnector.Web.Models.Domain.GolfMatch", b =>
                {
                    b.HasOne("GolfConnector.Web.Models.Domain.Club")
                        .WithMany()
                        .HasForeignKey("ClubId");
                });

            modelBuilder.Entity("GolfConnector.Web.Models.Domain.GolfMatchPlayer", b =>
                {
                    b.HasOne("GolfConnector.Web.Models.Domain.GolfMatch")
                        .WithMany()
                        .HasForeignKey("GolfMatchId");

                    b.HasOne("GolfConnector.Web.Models.Domain.InviteStatus")
                        .WithMany()
                        .HasForeignKey("InviteStatusId");

                    b.HasOne("GolfConnector.Web.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("GolfConnector.Web.Models.Domain.PlayerQueue", b =>
                {
                    b.HasOne("GolfConnector.Web.Models.Domain.GolfMatch")
                        .WithMany()
                        .HasForeignKey("GolfMatchId");

                    b.HasOne("GolfConnector.Web.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNet.Identity.EntityFramework.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("GolfConnector.Web.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("GolfConnector.Web.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNet.Identity.EntityFramework.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNet.Identity.EntityFramework.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId");

                    b.HasOne("GolfConnector.Web.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId");
                });
        }
    }
}
