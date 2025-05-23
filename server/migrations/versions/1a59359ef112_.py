"""empty message

Revision ID: 1a59359ef112
Revises: 
Create Date: 2025-05-01 21:05:28.755438

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1a59359ef112'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userProfile',
    sa.Column('id', sa.String(length=32), nullable=False),
    sa.Column('username', sa.String(length=12), nullable=True),
    sa.Column('fullName', sa.String(length=30), nullable=False),
    sa.Column('email', sa.String(length=30), nullable=False),
    sa.Column('password', sa.String(length=12), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('user',
    sa.Column('id', sa.String(length=32), nullable=False),
    sa.Column('signupid', sa.String(length=32), nullable=False),
    sa.Column('username', sa.String(length=12), nullable=True),
    sa.Column('email', sa.String(length=30), nullable=False),
    sa.Column('password', sa.String(length=12), nullable=False),
    sa.ForeignKeyConstraint(['signupid'], ['userProfile.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('id'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('userProfile')
    # ### end Alembic commands ###
