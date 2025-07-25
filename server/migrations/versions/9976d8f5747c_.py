"""empty message

Revision ID: 9976d8f5747c
Revises: 
Create Date: 2025-06-01 15:15:50.873477

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9976d8f5747c'
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
    op.create_table('waitinglist',
    sa.Column('id', sa.String(length=32), nullable=False),
    sa.Column('email', sa.String(length=30), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('id')
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
    op.drop_table('waitinglist')
    op.drop_table('userProfile')
    # ### end Alembic commands ###
